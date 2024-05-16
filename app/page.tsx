import dynamic from "next/dynamic";
const Posts = dynamic(() => import("@components/Posts"), {
  loading: () => <p>Loading...</p>,
})

const textGradientStyle = {
    background: 'linear-gradient(to top, red, yellow)',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    color: 'transparent'
  };
const Home:React.FC = () => {
  return (
    <section className="flex flex-col justify-center items-center">
        <h1 className="text-4xl text-center font-extrabold">
            Learn and Share
            <br/>
            <span className="text-4xl text-center font-extrabold" style={{...textGradientStyle, textAlign:'center'}}>where ever you go</span>
            </h1>
        <p className="text-base text-center font-medium">learn & share different ideas</p>
        <Posts/>
    </section>
  )
}

export default Home