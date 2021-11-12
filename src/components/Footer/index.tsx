import format from 'date-fns/format';
import ptBR from 'date-fns/locale/pt-BR';

import styles from './styles.module.scss';

export function Footer() {
    const currentDate = format(new Date(), 'eeee, PPP', {
        locale: ptBR,
    });

    return (
        <footer className={styles.footerContainer}>
            <p>&copy;2021 | Toaki - Gerenciamento de estoques v1.0</p>
        </footer>
    );
}
