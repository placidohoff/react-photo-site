import { useEffect, useState } from 'react'
import './Header.css'
import bigLogo from '../../images/QleanShotMedia.png'
// import 'bootstrap/dist/css/bootstrap.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
// import { Link } from 'react-router-dom'


const Header = () => {
    const [isScrolling, setIsScrolling] = useState(false)

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
    }, [])

    const handleScroll = () => {
        if (
            document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
            setIsScrolling(true);
        } else {
            setIsScrolling(false);
        }
    }

    return (
        <div style={{ backgroundColor: '#494f55', top: '0', position: 'fixed', width: '100%', margin: '0', zIndex: '10' }} className='header row d-flex justify-content-between p-4'>
            <div className='col-3 mt-2'>
                {/* <Link to="/"> */}
                <img id='big-logo' className='img-fluid' src={bigLogo} alt='Qleen Shot Media' style={{
                    width: isScrolling ? '55%' : '80%',
                    height: 'auto', cursor: 'pointer'
                }}
                onClick={() => window.location.href = '/'} />
                {/* </Link> */}
            </div>
            <div className='col-6 d-flex justify-content-center'>
                <ul className='d-flex align-items-end menu justify-content-end' style={{ listStyle: 'none', color: '#fff', fontSize: '1.2em' }}>
                    <li className='px-3 mx-2 hover-underline-animation' onClick={() => window.location.href = '/'}>Gallery</li>
                    <li className='px-3 mx-2 hover-underline-animation' onClick={() => window.location.href = '/session'}>Book a Session</li>
                    <li className="px-3 mx-2 hover-underline-animation">
                        <FontAwesomeIcon icon={faInstagram} />
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Header;