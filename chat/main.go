package main

import (
	"fmt"
	"net/http"
)

func main() {
	setUpAPI()
	fmt.Println("Serving on 8080...")
	http.ListenAndServe(":8080", nil)
}
func sendHello(w http.ResponseWriter, r *http.Request) {
	fmt.Fprint(w, "Hello")
}
func setUpAPI() {
	manager := NewManager()
	http.HandleFunc("/", sendHello)
	http.HandleFunc("/ws", manager.serveWS)

}
