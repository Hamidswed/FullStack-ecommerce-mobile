import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { ProductType } from "../../../types/productType";

type PropType = {
  product: ProductType;
};

export default function OrderItem({ product }: PropType) {
  return (
    <Card sx={{ display: "flex", width: "320px" }}>
      <CardMedia
        component="img"
        sx={{
          width: 80,
          height: "fit-content",
          margin: "auto 0",
          padding: "0 5px",
        }}
        image={product.productImage}
        alt={product.title}
      />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto", textAlign: "left" }}>
          <Typography component="div" variant="h6">
            {product.title}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            Price: ${product.price}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            Quantity: {product.quantity}
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
}
