"use client"
import React, {useEffect, useRef, useState} from 'react'
import "../Header/header.scss";
import Link from 'next/link';
import HeaderLinks from "@/shared/HeaderLinks/HeaderLinks";
import Burger from "@/shared/Burger";
import {useParams, useRouter} from "next/navigation";
import TelegramIcon from "@/shared/SVG/TelegramIcon";
import useSWR from "swr";
import {ContactInfoInterface} from "@/interfases/interfaces";
import {getContacts} from "@/api/clientAPI";


function Header() {

    const router = useRouter();
    const params = useParams();

    useEffect(() => {
        const hash = window.location.hash;
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
            setTimeout(() => {
                element.scrollIntoView({behavior: "smooth", block: "center", inline: "center"});
            }, 100);
        }

    }, [params]);
    const {data, isLoading} = useSWR<ContactInfoInterface | undefined>('contacts/', getContacts)
    const [isOpen, setIsOpen] = useState(false);



    function disableScroll() {
        document.body.style.overflow = 'hidden';
    }

    function enableScroll() {
        document.body.style.overflow = 'auto';
    }

    useEffect(() => {
        if (isOpen) {
            disableScroll();
        } else {
            enableScroll()
        }
    }, [isOpen]);

    return (
        <header className="Header" id="navbar">
            <div className="container Header__container">
                <div className="Header__headerLogo" onClick={() => {
                    router.push('/')
                }}>

                    <img width={50} height={50} src="/img/logo-rso.png" alt=" "/>
                    <img width={50} height={50} src="/img/logo-sevro.png" alt=" "/>
                </div>

                {/*Переносим ссылки в отдельный share*/}
                <div className='Header__headerLinks'>
                    <HeaderLinks/>
                </div>
                <div className="Header__headerButton">
                    <Link href={data && data.join ? data?.join.value : '#'} target="_blank">
                        <button className="Header__headerButton__button">
                            Вступить
                        </button>
                    </Link>
                </div>

                <div className="Header__burger">

                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className={isOpen ? "Header__burger__menu active-menu" : "Header__burger__menu"}
                    >
                        <Burger isOpen={isOpen}/>
                    </button>

                    <div
                        className="Header__burger-modal"
                        style={{display: isOpen ? "block" : "none"}}
                    >
                        <div className="Header__burger-modal-items">
                            <div className="Header__burger-modal__headerLogo" onClick={() => setIsOpen(!isOpen)}>
                                <Link href="/">
                                    <img
                                        width={50}
                                        height={50}
                                        src="/img/logo-rso.png"
                                    ></img>
                                </Link>
                                <Link href="/">
                                    <img
                                        width={50}
                                        height={50}
                                        src="/img/logo-sevro.png"
                                    ></img>
                                </Link>
                            </div>
                            <div className="Header__burger-modal__headerLinks">
                                <HeaderLinks setIsOpen={setIsOpen}/>
                            </div>
                            <div className="Header__burger-modal__headerButton">
                                <Link href={data && data.join ? data?.join.value : '#'} target="_blank">
                                    <button className="Header__burger-modal__headerButton__button">
                                        Вступить
                                    </button>
                                </Link>
                            </div>
                            <div className="Header__burger-modal__header-icons">
                                <TelegramIcon onClick={() => window.open( data && data.telegram ? data?.telegram.value : '#', '_ blank')}/>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="64"
                                    height="64"
                                    viewBox="0 0 64 64"
                                    className="Header__burger-modal__header-icons__vk"

                                    // баг в коде
                                    onClick={() => window.open( data && data.vk ? data?.vk.value : '#', '_ blank')}

                                >
                                    <g clip-path="url(img/ico12-vk.svg)">
                                        <path
                                            d="M49.9761 43.1901C48.28 37.0161 43.6201 33.6004 41.6951 32.4149C48.4502 27.4968 48.5793 21.8392 48.5793 21.5928C48.5793 21.4343 48.5206 21.2876 48.4091 21.1761C48.2976 21.0646 48.1509 21 47.9924 21H42.3348C42.0766 21 41.8477 21.1702 41.7714 21.4167C39.9286 27.3794 36.1901 29.0345 34.6701 29.4688V21.5869C34.6701 21.2641 34.406 21 34.0832 21H28.5724C28.2496 21 27.9855 21.2641 27.9855 21.5869V35.813C26.2248 34.9503 21.8232 31.7811 21.3243 21.5634C21.3067 21.2524 21.0485 21.0059 20.7374 21.0059H14.5869C14.2641 21.0059 14 21.27 14 21.5928V23.8405C14 34.9209 23.0146 43.9355 34.0891 43.9355C34.4119 43.9355 34.676 43.6714 34.676 43.3486V36.2649C40.85 37.3917 42.5696 43.2488 42.6459 43.5012C42.7163 43.7535 42.9511 43.9296 43.2093 43.9296H49.4127C49.5946 43.9296 49.7707 43.8416 49.8763 43.7007C49.9937 43.554 50.0289 43.3662 49.9761 43.1901ZM43.626 42.7617C43.045 41.1889 40.5859 35.7778 34.1595 35.0031C33.9952 34.9796 33.825 35.0324 33.7017 35.1498C33.5785 35.2613 33.5022 35.4198 33.5022 35.59V42.7558C23.3432 42.4389 15.1738 34.0758 15.1738 23.8347V22.1738H20.1916C21.025 35.2907 28.1322 37.1628 28.4432 37.2391C28.6193 37.2802 28.8012 37.2391 28.9421 37.1276C29.083 37.0161 29.1651 36.8459 29.1651 36.664V22.1679H33.5022V30.1906C33.5022 30.3608 33.5726 30.5193 33.7017 30.6308C33.825 30.7423 33.9952 30.7951 34.1595 30.7775C34.406 30.7482 40.1692 29.9793 42.7691 22.1738H47.3468C47.1003 23.7525 45.9207 28.1952 40.2749 31.9748C40.0988 32.0921 40.0049 32.2917 40.0166 32.503C40.0284 32.7142 40.1516 32.8962 40.3394 32.9901C40.404 33.0194 46.4254 36.083 48.6262 42.7558H43.626V42.7617Z"
                                            fill="white"
                                        />
                                        <path
                                            d="M31.75 0C14.24 0 0 14.24 0 31.75C0 49.26 14.24 63.5 31.75 63.5C49.26 63.5 63.5 49.26 63.5 31.75C63.5 14.24 49.26 0 31.75 0ZM31.75 61.5C15.35 61.5 2 48.15 2 31.75C2 15.35 15.35 2 31.75 2C48.15 2 61.5 15.35 61.5 31.75C61.5 48.15 48.15 61.5 31.75 61.5Z"
                                            fill="white"
                                            fill-opacity="0.2"
                                        />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_208_1832">
                                            <rect
                                                width="64"
                                                height="64"
                                                fill="white"
                                            />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
