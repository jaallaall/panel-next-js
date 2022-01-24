import { useMemo } from "react";
import { Swiper } from "utils";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const Slider: React.FC = (): React.ReactElement => {
  const data = useMemo(
    () => [
      {
        title: "test1",
        name: "slide1",
        image: "/images/pexels-alina-lomilova-5218235.jpg",
        alt: "img1",
        description:
          "Lizards are a widespread group of squamate reptiles, with over",
      },
      {
        title: "test2",
        name: "slide2",
        image: "/images/pexels-egecan-köse-8602917.jpg",
        alt: "img2",
        description:
          "Lizards are a widespread group of squamate reptiles, with over",
      },
      {
        title: "test3",
        name: "slide3",
        image: "/images/pexels-polina-kholodova-9966291.jpg",
        alt: "img3",
        description:
          "Lizards are a widespread group of squamate reptiles, with over",
      },
      {
        title: "test4",
        name: "slide4",
        image: "/images/pexels-céline-10293190.jpg",
        alt: "img4",
        description:
          "Lizards are a widespread group of squamate reptiles, with over",
      },
    ],
    []
  );
  return (
    <Swiper
      data={data}
      render={(item) => (
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            component="img"
            height="140"
            image={item.image}
            alt={item.alt}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {item.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {item.description}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Share</Button>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
      )}
    />
  );
};

export default Slider;
