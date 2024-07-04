"use client";
import { useState } from "react";
import userStyles from "../styles/users.module.css";
import { IFormData } from "@/interfaces/formData.interface";

export function ContactForm({ userFirstName }: { userFirstName: string }) {
    const [formData, setFormData] = useState<IFormData>({
        name: "",
        email: "",
        message: "",
    });
    const [isValid, setIsValid] = useState<Boolean>(false);
    const [isLoading, setIsLoading] = useState<Boolean>(false);
    const [error, setError] = useState<Boolean>(false);
    const [incomplete, setIncomplete] = useState<Boolean>(false);

    //Lee el valor de cada input y lo asigna al objeto formData
    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (
            formData.name !== "" &&
            formData.email !== "" &&
            formData.message !== ""
        ) {
            setIncomplete(false);
        }
    };

    //Lógica de validación básica del formulario
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (
            formData.name !== "" &&
            formData.email !== "" &&
            formData.message !== ""
        ) {
            setIsLoading(true);
            if (!error) {
                //Permite renderizar de forma condicional el mensaje de éxito
                setTimeout(() => {
                    setIsLoading(false);
                    setIsValid(true);

                    return isLoading && isValid && incomplete;
                }, 3000);
            } else {
                setIsLoading(false);
                return error && isLoading;
            }
        } else {
            //TODO - AGREGAR RESPUESTA CUANDO NO ES VALIDO
            setIncomplete(true);
            return incomplete;
        }
    };
    console.log(isLoading);
    return (
        <>
            <section className={userStyles.contact}>
                <h2>
                    Contacta a{" "}
                    <span className={userStyles.userSpan}>{userFirstName}</span>
                </h2>
                <form
                    className={userStyles.form}
                    onSubmit={handleSubmit}
                    method="post"
                >
                    <div className={userStyles.formDivs}>
                        <label htmlFor="name">Nombre y Apellido</label>
                        <input
                            type="text"
                            id="name"
                            placeholder="Robert Plant"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className={userStyles.formDivs}>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="youremail@something.com"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className={userStyles.formDivs}>
                        <label htmlFor="message">Mensaje</label>
                        <textarea
                            id="message"
                            name="message"
                            placeholder="Enter your message here"
                            rows={4}
                            value={formData.message}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className={userStyles.formDivs}>
                        {!isLoading && !isValid ? (
                            <button type="submit">Enviar</button>
                        ) : isValid ? (
                            <span id="succesBtn">
                                Mensaje enviado con éxito
                            </span>
                        ) : error ? (
                            <span id="succesBtn">Ocurrió un error</span>
                        ) : (
                            <span id="succesBtn">Cargando...</span>
                        )}
                        {/* {!isValid ? (
                            <button type="submit">Enviar</button>
                        ) : (
                            <span id="succesBtn">
                                Mensaje enviado con éxito
                            </span>
                        )} */}
                    </div>
                </form>
                {incomplete && <span>Por favor complete todos los campos</span>}
            </section>
        </>
    );
}
