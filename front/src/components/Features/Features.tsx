import './Features.css'
import { FeaturesProps } from '../../types/interfaces'

export default function Features({ features }: FeaturesProps) {
  return (
    <ul>
       {features.map(feature => 
        <li key={feature.title} className='features-list'>
          <div className='elements'>
            {feature.title} {feature.src}
          </div>
        </li>
       )}
    </ul>
    )
};

