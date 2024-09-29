package main

import (
	"encoding/json"
	"log"
)

type EventHandler func(event Event, c *Client)

type Event struct {
	Type    string          `json:"type"`
	Payload json.RawMessage `json:"payload"`
}

// event type strings
const (
	CHAT_MESSAGE = "chat_message"
)

// payload types
type ChatPayload struct {
	Message string `json:"message"`
}

// event handlers
func ChatHandler(event Event, c *Client) {
	for wsClients := range c.manager.clients {
		var chatPayload ChatPayload

		err := json.Unmarshal(event.Payload, &chatPayload)

		log.Println(chatPayload.Message)

		if err != nil {
			log.Println("Error unmarshaling chat payload:", err)
		}
		wsClients.egress <- event
	}
}
