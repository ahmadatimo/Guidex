import { useNavigate } from "react-router-dom";
const CallToAction: React.FC = () => {
  const navigate = useNavigate();
    return (
      <section className="py-12 bg-blue-600 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Explore?</h2>
        <p className="mb-6">Schedule your campus tour today and start your journey with us.</p>
        <button onClick={() => {navigate('/appointment')}} className="bg-white text-blue-600 font-bold py-3 px-6 rounded hover:bg-gray-200">Schedule Your Tour</button>
      </section>
    );
  };
  
  export default CallToAction;
  