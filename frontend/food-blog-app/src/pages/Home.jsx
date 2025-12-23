import foodRecipe from "../assets/food1.png";
import RecipeItem from "../components/RecipeItem";

export default function Home() {
  return (
    <>
      <section className="home">
        <div className="left">
          <h1>Food Recipe</h1>
          <h5>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Perspiciatis dicta atque maiores ipsum similique soluta quidem,
            mollitia sequi, facere et assumenda nemo. Necessitatibus eum
            expedita ipsa possimus mollitia dolorum ipsam.
          </h5>
          <button>Share your recipe</button>
        </div>
        <div className="right">
          <img src={foodRecipe} width="320px" height="320px" />
        </div>
      </section>
      <div className="bg">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#d4f6e8"
            fillOpacity="1"
            d="M0,128L40,122.7C80,117,160,107,240,128C320,149,400,203,480,213.3C560,224,640,192,720,192C800,192,880,224,960,213.3C1040,203,1120,149,1200,138.7C1280,128,1360,160,1400,176L1440,192L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
          ></path>
        </svg>
      </div>
      <div className="recipe">
        <RecipeItem />
      </div>
    </>
  );
}
