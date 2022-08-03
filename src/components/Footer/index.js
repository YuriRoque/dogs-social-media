import { ReactComponent as Dogs } from '../../assets/dogs-footer.svg';
import styles from './style.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Dogs />
      <p>Dogs. Alguns direitos reservados.</p>
    </footer>
  );
};

export default Footer;
