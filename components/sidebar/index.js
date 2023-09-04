import { usePathname } from 'next/navigation';
import Link from 'next/link';
import styles from './sidebar.module.css';
import classNames from 'classnames';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router';
import Image from 'next/image'; // Import the Image component from 'next/image'

export default function Navbar() {
  const router = useRouter();
  const supabaseClient = useSupabaseClient();
  const user = useUser();

  let pathname = usePathname() || '/';
  if (pathname.includes('/blog/')) {
    pathname = '/blog';
  }

  const navItems = {
    '/': {
      img: '/logo.png',
    },
    '/about': {
      name: 'About',
    },
    '/blog': {
      name: 'Blog',
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

  return (
    <aside className={styles.container}>
      <div className={styles.sticky}>
        <nav className={styles.navigation} id="nav">
          <div className={styles.navigationItemWrapper}>
            {Object.entries(navItems).map(
              ([path, { img, name, requiresAuth, onClick }]) => {
                const isActive = path === pathname;

                // Don't render a link that requires auth if there's no user.
                if ((requiresAuth && !user) || (path === '/login' && user)) {
                  return null;
                }

                if (path === '/logout') {
                  return (
                    <button
                      className={classNames(styles.navigationButton, {
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
                    <span className={styles.linkName}>
                      {img && (
                        <Image
                          src={img}
                          alt={name}
                          width={32}
                          height={32}
                        />
                      )}
                      {name}
                    </span>
                  </Link>
                );
              },
            )}
          </div>
        </nav>
      </div>
    </aside>
  );
}