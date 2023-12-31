import { usePathname } from 'next/navigation';
import Link from 'next/link';
import styles from './sidebar.module.css';
import classNames from 'classnames';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [shouldCloseMenu, setShouldCloseMenu] = useState(false); // Added state variable
  const router = useRouter();
  const supabaseClient = useSupabaseClient();
  const user = useUser();

  let pathname = usePathname() || '/';
  if (pathname.includes('/blog/')) {
    pathname = '/blog';
  }

  const navItems = {
    '/': {
      img: '/logo.svg',
    },
    '/about': {
      name: 'About',
    },
    '/blog': {
      name: 'Articles',
    },
    '/create-post': {
      name: 'Create post',
      requiresAuth: true,
    },
    '/login': {
      name: 'Login',
      requiresAuth: false,
    },
    '/logout': {
      name: 'Logout',
      requiresAuth: true,
      onClick: async () => {
        await supabaseClient.auth.signOut();
        router.push('/login');
      },
    },
  };

  const toggleMenu = () => {
    if (isOpen) {
      setIsOpen(false);
      setShouldCloseMenu(false);
    } else {
      setIsOpen(true);
      setShouldCloseMenu(true);
    }
  };

  useEffect(() => {
    const handleDocumentClick = (e) => {
      const menu = document.querySelector(`.${styles['menu-icon']}`);
      if (menu && !menu.contains(e.target)) {
        setIsOpen(false);
        setShouldCloseMenu(false);
      }
    };

    const handleScroll = () => {
      if (shouldCloseMenu) {
        setIsOpen(false);
        setShouldCloseMenu(false);
      }
    };

    document.addEventListener('click', handleDocumentClick);
    window.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [shouldCloseMenu]);

  return (
    <nav className={styles.navbar}>
      <div className={styles.logoContainer}>
        <Link href="/">
          <Image src={navItems['/'].img} alt="Logo" width={32} height={32} />
        </Link>
      </div>
      <div className={styles.menuContainer}>
        <div
          className={`${styles['menu-icon']} ${isOpen ? styles.open : ''}`}
          onClick={toggleMenu}
        >
          <div className={styles.bar}></div>
          <div className={styles.bar}></div>
          <div className={styles.bar}></div>
        </div>
        <div className={styles.navItemContainer}>
          {isOpen && (
            <ul
              className={`${styles['navbar-items']} ${
                isOpen ? styles.open : ''
              }`}
            >
              {Object.entries(navItems).map(
                ([path, { name, requiresAuth, onClick }]) => {
                  const isActive = path === pathname;

                  // Don't render a link that requires auth if there's no user.
                  if ((requiresAuth && !user) || (path === '/login' && user)) {
                    return null;
                  }

                  if (path === '/logout') {
                    return (
                      <button
                        className={classNames(styles.logoutButton, {
                          [styles.textNeutral]: !isActive,
                          [styles.fontBold]: isActive,
                        })}
                        key={path}
                        onClick={onClick}
                      >
                        {name}
                      </button>
                    );
                  }

                  return (
                    <Link
                      key={path}
                      href={path}
                      className={classNames(styles.navigationItem, {
                        [styles.textNeutral]: !isActive,
                        [styles.fontBold]: isActive,
                      })}
                    >
                      <span className={styles.linkName}>{name}</span>
                    </Link>
                  );
                },
              )}
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}
