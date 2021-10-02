export interface Introduction {
    messages: Message[];
}

export interface Message {
    content: string;
    inputs: Input[];
    resource: any; // image / animation
}

export interface Input {
    name: string;
    placeholder: string;
}
