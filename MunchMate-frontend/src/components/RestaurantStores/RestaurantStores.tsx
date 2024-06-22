import RestaurantItemCard from "../RestaurantItemCard/RestaurantItemCard";

const RestaurantStores = () => {
  const items = [
    {
      id: 1,
      name: "Grand Ai Cafe",
      tags: ["Noodles", "Cafe", "Pasta", "Chinese"],
      time: "26",
      deliveryFrom: "100",
      imageUrl: "/src/assets/Group 11.png",
      description:
        "A cozy cafe offering a variety of Chinese and Italian dishes.",
      address: "123 Main Street, Cityville, Country",
      rating: 4.5,
    },
    {
      id: 2,
      name: "The Indian Kitchen",
      tags: ["Biriyani", "Paratta", "Tika Masala", "Indian"],
      time: "26",
      deliveryFrom: "100",
      imageUrl: "/src/assets/Group 8.png",
      description: "Authentic Indian cuisine with a modern twist.",
      address: "456 Spice Avenue, Cityville, Country",
      rating: 4.2,
    },
    {
      id: 3,
      name: "StarBucks",
      tags: ["Burger", "Cafe", "Healthy", "American"],
      time: "26",
      deliveryFrom: "100",
      imageUrl: "/src/assets/Group 11.png",
      description:
        "Popular American cafe chain known for its burgers and healthy options.",
      address: "789 Coffee Lane, Cityville, Country",
      rating: 4.0,
    },
    {
      id: 4,
      name: "Pasta Palace",
      tags: ["Pasta", "Italian", "Vegetarian"],
      time: "20",
      deliveryFrom: "150",
      imageUrl: "/src/assets/Group 8.png",
      description: "Delicious pasta dishes made with fresh, local ingredients.",
      address: "321 Olive Road, Cityville, Country",
      rating: 4.3,
    },
    {
      id: 5,
      name: "Sushi Central",
      tags: ["Sushi", "Japanese", "Seafood"],
      time: "30",
      deliveryFrom: "200",
      imageUrl: "/src/assets/Group 8.png",
      description: "Fresh sushi and sashimi prepared by experienced chefs.",
      address: "654 Fish Street, Cityville, Country",
      rating: 4.7,
    },
    {
      id: 6,
      name: "Taco Town",
      tags: ["Tacos", "Mexican", "Spicy"],
      time: "25",
      deliveryFrom: "120",
      imageUrl: "/src/assets/Group 8.png",
      description:
        "A variety of flavorful tacos with both meat and vegetarian options.",
      address: "789 Fiesta Avenue, Cityville, Country",
      rating: 4.1,
    },
  ];

  return (
    <div>
      <div className="grid grid-cols-3 gap-5">
        {items.map((item) => (
          <RestaurantItemCard item={item} />
        ))}
      </div>
    </div>
  );
};

export default RestaurantStores;
