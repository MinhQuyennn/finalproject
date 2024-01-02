
import styles from './Footer.module.scss'
import className from 'classnames/bind';
import img from '../../assets/img/icons8-up-96.png'

const cx = className.bind(styles);

function Footer(){

    return (
        <div className={cx('footer')}>
        <div className={cx('copyright')}>
            <p>2024 Booking Train Ticket, All Rights Reversed.</p>
        </div>

        <div>
        <a href='#' className={cx('scroll-top')}>
          <i className={`ri-arrow-up-s-fill ${cx('icon')}`} style={{ display: 'flex', alignItems: 'center' }}>
            <img src={img} alt="Up Arrow" className={cx('arrow-image')} style={{ width: '10px', height: '10px' }} />
          </i>
        </a>
        </div>
        </div>
    )
}

export default Footer ;