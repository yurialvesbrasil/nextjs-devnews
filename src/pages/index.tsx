import React from "react";
import SEO from "../components/SEO";
import styles from "../styles/home.module.scss";

export default function Home() {
  return (
    <>
      <SEO title="Home" excludeTitleSuffix/>
      <main className={styles.content}>
        <section className={styles.section}>
          <span>Olá Dev!</span>
          <h1>Bem-vindo(a) ao <br />
          <span>Dev</span> News!
          </h1>
          <p>
            Um blog com conteúdo extremamente <br />
            <span>relevantes para o seu apredizado</span>
          </p>
        </section>

        <img src="/home.svg" alt="Home image"/>
      </main>
    </>
  )
}
