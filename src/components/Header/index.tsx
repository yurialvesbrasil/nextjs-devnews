import styles from './styles.module.scss';
import React from 'react';
import { ActiveLink } from '../ActiveLink';
import  Image from 'next/image';
import  logo from '../../../public/logo.svg';

export function Header() {
    return (
        <header className={styles.container}>
            <div className={styles.content}>
                <Image src={logo} alt="DevNews!" />
                <nav>
                    <ActiveLink href="/" activeClassName={styles.active}>
                        <a>Home</a>
                    </ActiveLink>
                    <ActiveLink href="/posts" activeClassName={styles.active}>
                        <a>Posts</a>
                    </ActiveLink>
                </nav>
            </div>
        </header>
    )
}