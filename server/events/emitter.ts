import { randomUUID } from "crypto";

export interface HdEventEnvelope<T = unknown> {
  eventId: string;
  eventName: string;
  version: string;
  correlationId: string;
  occurredAt: string;
  producer: string;
  actor: { id: string; type: "user" | "service_principal" | "system" };
  payload: T;
}

const MAX_EVENTS = 100;
const eventLog: HdEventEnvelope[] = [];

// HD-BRAIN subscribes to all HD-CRM events.
const BRAIN_URL = process.env.BRAIN_EVENTS_URL ?? "";

function forwardEvent(envelope: HdEventEnvelope): void {
  const secret = process.env.EVENT_BUS_SECRET;
  if (!secret || !BRAIN_URL) return;
  fetch(BRAIN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-event-bus-secret": secret },
    body: JSON.stringify(envelope),
  }).catch((err: unknown) => {
    console.warn(`[EVENT FORWARD] Failed ${envelope.eventName} → ${BRAIN_URL}:`, err);
  });
}

export function emitEvent<T>(
  eventName: string,
  payload: T,
  producer: string,
  actor: HdEventEnvelope["actor"],
  correlationId?: string
): HdEventEnvelope<T> {
  const envelope: HdEventEnvelope<T> = {
    eventId: randomUUID(),
    eventName,
    version: "1.0",
    correlationId: correlationId ?? randomUUID(),
    occurredAt: new Date().toISOString(),
    producer,
    actor,
    payload,
  };
  eventLog.push(envelope as HdEventEnvelope);
  if (eventLog.length > MAX_EVENTS) eventLog.shift();
  console.log(
    `[EVENT] ${eventName} producer=${producer} correlationId=${envelope.correlationId} actor=${actor.id}(${actor.type})`
  );
  forwardEvent(envelope as HdEventEnvelope);
  return envelope;
}

export function getRecentEvents(): HdEventEnvelope[] {
  return [...eventLog];
}
