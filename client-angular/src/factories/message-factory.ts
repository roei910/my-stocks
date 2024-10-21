import { Injectable } from "@angular/core";
import { Message } from "primeng/api/message";

@Injectable({
    providedIn: 'root'
})
export class MessageFactory {
    public createErrorMessage(body?: string,): Message {
        let message = {
            severity: 'error',
            summary: 'Error',
            detail: body
        };

        return message;
    }
}