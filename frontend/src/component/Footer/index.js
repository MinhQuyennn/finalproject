
import styles from './Footer.module.scss'
import className from 'classnames/bind';
 
const cx = className.bind(styles);

function Footer(){

    return (
        <div className={cx('footer')}>
        <div className={cx('copyright')}>
            <p>2023 Ngoc Huyen, All Rights Reversed.</p>
        </div>

        <div>
            <a href='#' className={cx('scroll-top')}>
                <i class='ri-arrow-up-s-fill'></i> 
            </a>
        </div>
        </div>
    )
}

export default Footer ;