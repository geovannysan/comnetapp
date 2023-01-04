import './ExploreContainer.css';

interface ContainerProps {
  name: string;
}

const ExploreContainer: React.FC<ContainerProps> = ({ name }) => {
  return (
    <div className="container">
      <div className=' row container '>
        <div className=' col-6'>
          <div className='card'>
            <div className=' card-body'></div>
          </div>

        </div>

      </div>
       </div>
  );
};

export default ExploreContainer;
