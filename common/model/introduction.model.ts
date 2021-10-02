export interface Introduction {
    messages: Message[];
}

export interface Message {
    content: string;
    // inputs: Input[];
    inputName: boolean;
    resource: any; // image / animation
}

export interface Input {
    name: string;
    placeholder: string;
}
