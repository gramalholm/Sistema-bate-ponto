import { response } from "express";
import { json } from "stream/consumers";

const formElement = document.querySelector("#form")!;

const userInput: HTMLInputElement = formElement.querySelector("#user")!;
const passwordInput: HTMLInputElement = formElement.querySelector("#password")!;

formElement?.addEventListener("button", async (e) =>{
    e.preventDefault();
    const user = userInput.value;
    const password = passwordInput.value;
    await fetch("/index.ts").then((response) => {
        console.log("entrou", response);
        return response;
    }).catch((err) => {
        console.log("rejeitado", err);
        return err;
    });
})
