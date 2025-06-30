"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { User, X } from "lucide-react";
import { Dialog, DialogClose, DialogContent } from "../ui/dialog";
import SignInForm from "./auth/SignInForm";
import SignUpForm from "./auth/SignUpForm";
import { signIn } from "next-auth/react";

export default function LoginButton() {
  const [isSignin, setIsSignin] = useState(true);
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        className="flex items-center flex-col sm:flex-row gap-1 h-10 px-2 text-primary font-semibold bg-accent text-base sm:px-6 sm:py-3 border-none hover:bg-accent/80 sm:rounded-xl focus-visible:ring-0"
        variant="secondary"
        onClick={() => {
          setOpen(true);
          setIsSignin(true);
        }}
      >
        <User className="hidden sm:block" size={16} />
        Войти
      </Button>
      <Dialog open={open} onOpenChange={() => setOpen(false)}>
        <DialogContent
          className="max-w-[450px] w-full !rounded-2xl"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <DialogClose>
            <X size={16} className="absolute top-3 right-3" />
          </DialogClose>
          {isSignin ? (
            <SignInForm onClose={() => setOpen(false)} />
          ) : (
            <SignUpForm />
          )}
          <div className="flex gap-4">
            <Button
              onClick={async () => {
                await signIn("github");
              }}
              variant={"secondary"}
              className="h-10 w-full text-base transition-all hover:bg-transparent"
            >
              <img
                className="w-6 h-6"
                src="https://github.githubassets.com/favicons/favicon.svg"
              ></img>
              Github
            </Button>
            <Button
              onClick={async () => {
                await signIn("google");
              }}
              variant={"secondary"}
              className="h-10 w-full text-base transition-all hover:bg-transparent"
            >
              <img
                className="w-6 h-6"
                src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg"
              ></img>
              Google
            </Button>
          </div>
          <p className="text-center" onClick={() => setIsSignin(!isSignin)}>
            {isSignin ? (
              <>
                Еще нет аккаунта?{" "}
                <span className="hover:text-accent-foreground underline-offset-4 underline cursor-pointer">
                  Зарегистрироваться
                </span>
              </>
            ) : (
              <>
                Уже есть аккаунта?{" "}
                <span className="hover:text-accent-foreground underline-offset-4 underline cursor-pointer">
                  Войти
                </span>
              </>
            )}
          </p>
        </DialogContent>
      </Dialog>
    </>
  );
}
