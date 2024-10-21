"use client"

import Link from "next/link"
import styles from "./erro.module.scss"
export default function NotFound(){
    return(
        <div className={styles.error}>
            <h1>Ops! essa página não existe!</h1>
            <Link href="/">
                Voltar para home
            </Link>
        </div>
    )
}