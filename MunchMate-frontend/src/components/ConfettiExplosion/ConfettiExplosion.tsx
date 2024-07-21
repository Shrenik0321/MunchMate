import ConfettiExplosion from "react-confetti-explosion";

const ConfettiExplosionComponent = ({ isExploding }: any) => {
  return (
    <div className="flex items-center justify-center">
      {isExploding && <ConfettiExplosion />}
    </div>
  );
};

export default ConfettiExplosionComponent;
