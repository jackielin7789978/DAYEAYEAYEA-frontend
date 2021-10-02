import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { COLOR } from "../../constants/style";

export default function MediaCard() {
  return (
    <Card
      sx={{
        minWidth: "220px",
        maxWidth: "400px",
        margin: "20px",
      }}
    >
      <CardMedia
        component="img"
        height="140"
        image="https://i.imgur.com/WkXY2Fx.jpg"
        alt="green iguana"
        sx={{ height: 200 }}
      />
      <CardContent>
        <Typography gutterBottom variant="p" component="div">
          長得像打火機的酒
        </Typography>
        <Typography variant="h6" sx={{ color: COLOR.warning }}>
          NT$ 3990
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="large">加入購物車</Button>
      </CardActions>
    </Card>
  );
}
