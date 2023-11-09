import FormWrapper from "@/components/FormWrapper";
import React from "react";

export default function ResetPasswordLayout({ children }: { children: React.ReactNode }) {
    return (
        <section className="flex-1 pt-[50px] px-[40px] order-1">
            <FormWrapper>
                {children}
            </FormWrapper>
        </section>
    )
}