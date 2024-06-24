import React, { Component } from 'react';
import Lightbox from 'react-image-lightbox';

const images = [
    '/images/gallery/gallery1.webp',
    '/images/gallery/gallery2.webp',
    '/images/gallery/gallery3.webp',
    '/images/gallery/gallery4.webp',
    '/images/gallery/gallery5.webp',
    '/images/gallery/gallery6.webp',
    '/images/gallery/gallery7.webp',
    '/images/gallery/gallery8.webp',
    '/images/gallery/gallery9.webp',
    '/images/gallery/gallery10.webp',
    '/images/gallery/gallery11.webp',
    '/images/gallery/gallery12.webp',
    '/images/gallery/gallery13.webp',
    '/images/gallery/gallery14.webp',
    '/images/gallery/gallery15.webp',
]

class Gallery extends Component {

    state = {
        photoIndex: 0,
        isOpenImage: false
    }

    render() {
        const { photoIndex, isOpenImage } = this.state;
        return (
            <>
                <section className="gallery-area ptb-100 pb-0">
                    <div className="container">
                        <div className="section-title">
                            <h2>Cloud 9 Smoke Shop Gallery</h2>
                        </div>
                    </div>

                    <div className="container-fluid">
                        <div className="shorting">
                            <div className="row">
                                {isOpenImage && (
                                    <Lightbox
                                        mainSrc={images[photoIndex]}
                                        nextSrc={images[(photoIndex + 1) % images.length]}
                                        prevSrc={images[(photoIndex + images.length - 1) % images.length]}
                                        onCloseRequest={() => this.setState({ isOpenImage: false })}
                                        onMovePrevRequest={() =>
                                        this.setState({
                                            photoIndex: (photoIndex + images.length - 1) % images.length,
                                        })
                                        }
                                        onMoveNextRequest={() =>
                                            this.setState({
                                                photoIndex: (photoIndex + 1) % images.length,
                                            })
                                        }
                                    />
                                )}
                    
                                <div className="single-gallery-box">
                                    <img src="/images/gallery/gallery1.webp" alt="image" />
                                    <div 
                                        className="gallery-btn"
                                        onClick={e => { this.setState({ isOpenImage: true, photoIndex: 0 })}}
                                    >
                                        <i className="flaticon-expand"></i>
                                    </div>
                                </div>
            
                                <div className="single-gallery-box">
                                    <img src="/images/gallery/gallery2.webp" alt="image" />
                                    <div 
                                        className="gallery-btn"
                                        onClick={e => { this.setState({ isOpenImage: true, photoIndex: 1 })}}
                                    >
                                        <i className="flaticon-expand"></i>
                                    </div>
                                </div>
                                <div className="single-gallery-box">
                                    <img src="/images/gallery/gallery3.webp" alt="image" />
                                    <div 
                                        className="gallery-btn"
                                        onClick={e => { this.setState({ isOpenImage: true, photoIndex: 2 })}}
                                    >
                                        <i className="flaticon-expand"></i>
                                    </div>
                                </div>
            
                                <div className="single-gallery-box">
                                    <img src="/images/gallery/gallery4.webp" alt="image" />
                                    <div 
                                        className="gallery-btn"
                                        onClick={e => { this.setState({ isOpenImage: true, photoIndex: 3 })}}
                                    >
                                        <i className="flaticon-expand"></i>
                                    </div>
                                </div>
            
                                <div className="single-gallery-box">
                                    <img src="/images/gallery/gallery6.webp" alt="image" />
                                    <div 
                                        className="gallery-btn"
                                        onClick={e => { this.setState({ isOpenImage: true, photoIndex: 5 })}}
                                    >
                                        <i className="flaticon-expand"></i>
                                    </div>
                                </div>
            
                                <div className="single-gallery-box">
                                    <img src="/images/gallery/gallery8.webp" alt="image" />
                                    <div 
                                        className="gallery-btn"
                                        onClick={e => { this.setState({ isOpenImage: true, photoIndex: 7 })}}
                                    >
                                        <i className="flaticon-expand"></i>
                                    </div>
                                </div>

                                <div className="single-gallery-box">
                                    <img src="/images/gallery/gallery11.webp" alt="image" />
                                    <div 
                                        className="gallery-btn"
                                        onClick={e => { this.setState({ isOpenImage: true, photoIndex: 10})}}
                                    >
                                        <i className="flaticon-expand"></i>
                                    </div>
                                </div>
            
                                <div className="single-gallery-box">
                                    <img src="/images/gallery/gallery10.webp" alt="image" />
                                    <div 
                                        className="gallery-btn"
                                        onClick={e => { this.setState({ isOpenImage: true, photoIndex: 9 })}}
                                    >
                                        <i className="flaticon-expand"></i>
                                    </div>
                                </div>
                                <div className="single-gallery-box">
                                    <img src="/images/gallery/gallery13.webp" alt="image" />
                                    <div 
                                        className="gallery-btn"
                                        onClick={e => { this.setState({ isOpenImage: true, photoIndex: 12 })}}
                                    >
                                        <i className="flaticon-expand"></i>
                                    </div>
                                </div>
                                <div className="single-gallery-box">
                                    <img src="/images/gallery/gallery15.webp" alt="image" />
                                    <div 
                                        className="gallery-btn"
                                        onClick={e => { this.setState({ isOpenImage: true, photoIndex: 14 })}}
                                    >
                                        <i className="flaticon-expand"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        );
    }
}

export default Gallery;