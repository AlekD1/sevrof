import '../Video-slice/video.scss';

function VideoSlice() {
    // var videos = document.getElementsByTagName("video"),
    //     fraction = 0.8;
    // function checkScroll() {
    //
    //     for (var i = 0; i < videos.length; i++) {
    //
    //         var video = videos[i];
    //
    //         var x = video.offsetLeft, y = video.offsetTop, w = video.offsetWidth, h = video.offsetHeight, r = x + w, //right
    //             b = y + h, //bottom
    //             visibleX, visibleY, visible;
    //
    //         visibleX = Math.max(0, Math.min(w, window.pageXOffset + window.innerWidth - x, r - window.pageXOffset));
    //         visibleY = Math.max(0, Math.min(h, window.pageYOffset + window.innerHeight - y, b - window.pageYOffset));
    //
    //         visible = visibleX * visibleY / (w * h);
    //
    //         if (visible > fraction) {
    //             video.play();
    //
    //         } else {
    //             video.pause();
    //         }
    //
    //     }
    //
    // }
    //
    // window.addEventListener('scroll', checkScroll, false);
    // window.addEventListener('resize', checkScroll, false);
    return (

        <div className="Video-slice">
            <video muted loop controls poster="../img/promo-movie.png" className="Video-slice__style">
                <source src="video/promo2.mp4" type="video/mp4"></source>
            </video>
        </div>
    );
}

export default VideoSlice;
