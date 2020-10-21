      {/* <!-- Wrapper --> */}
      <div id="wrapper">
        <Sidebar />
        {/* <New /> */}
        {/* <!-- Page Content --> */}
        <div id="page-content-wrapper">
          <Container fluid>
            {
            this.props.videos.map((video) => {
              return <VideoContainer
                video={video}
                key={video.id}
               />
              }
            )
            }
          </Container>
        </div>
        {/* <!-- /#page-content-wrapper --> */}
      </div>
      {/* <!-- /#wrapper --> */}



  componentDidMount() {
    // $("#menu-toggle").click(function(e) {
    //   e.preventDefault();
    //   $("#wrapper").toggleClass("toggled");
    // });
    this.fetchVideos()
  }

  fetchVideos = async () => {
    const res = await fetch('http://localhost:3001/api/v1/videos');
    const videos = await res.json();
    // this.props.getVideos(videos);
  };


  const setStateToProps = (state) => {
    return {
      videos: state.videos
    };
  };
  
  const setDispatchToProps = {
    getVideos
  };
  
  export default connect(setStateToProps, setDispatchToProps)(MyNavbar);