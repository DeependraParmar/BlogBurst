'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from "./header.module.css"
import Image from 'next/image'
import logo from "@/assets/logo.png"
import { useState } from 'react'
import { RiMenu4Fill } from 'react-icons/ri'
import { IoMdClose } from 'react-icons/io'

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const links = [{
    title: "Home",
    url: "/"
  },
  {
    title: "About",
    url: "/about"
  },
  {
    title: "Contact",
    url: "/contact"
  },
  {
    title: "Blog",
    url: "/blog"
  }
  ]

  const session = false;
  const isAdmin = true;


  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <Image src={logo} alt="logo" width={30} height={30} />
        <p>BlogBurst</p>
      </div>
      <div className={styles.navlinks}>
        <ul className={styles.links}>
          {
            links.map((link, index) => (
              <NavLink key={index} title={link.title} url={link.url} />
            ))
          }
          {
            session ? (
              <>
                {
                  isAdmin && <NavLink title="Admin" url="/admin" />
                }
                <button className={styles.button}>Logout</button>
              </>
            ) : (
              <Link href="/login" className={styles.button}>Login</Link>)
          }
        </ul>
      </div>

      <button className={styles.menuButton} onClick={() => setOpen(prev => !prev)}><RiMenu4Fill size={16} /></button>
      {
        open && <div className={styles.mobileLinks}>
          <ul>
            {
              links.map((link, index) => (
                <NavLink key={index} title={link.title} url={link.url} />
              ))
            }
            {
              session ? (
                <>
                  {
                    isAdmin && <NavLink title="Admin" url="/admin" />
                  }
                  <button className={styles.button}>Logout</button>
                </>
              ) : (
                <Link href="/login" className={styles.button}>Login</Link>)
            }
            {
              <button className={styles.closeButton} onClick={() => setOpen(prev => !prev)}><IoMdClose size={16} /></button>
            }
          </ul>
        </div>
      }
    </div>
  )
}

const NavLink = ({ title, url }) => {
  const pathName = usePathname();
  return (
    <li className={`${styles.navlinks} ${pathName === url && styles.active}`}>
      <Link href={url}>{title}</Link>
    </li>
  )
}

export default Navbar
