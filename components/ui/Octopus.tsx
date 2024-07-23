import React, { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion, useAnimation } from 'framer-motion';
import './Octopus.css';

const activities = ['walking', 'coding', 'working with React Fiber and Three.js'];

const Octopus: React.FC = () => {
  const controls = useAnimation();
  const [activity, setActivity] = useState<string>('walking');

  useEffect(() => {
    const sequence = async () => {
      for (const act of activities) {
        setActivity(act);
        await controls.start(act);
        await controls.start({ opacity: 1 });
        await new Promise((resolve) => setTimeout(resolve, 2000)); // Display each activity for 2 seconds
      }
    };

    sequence();
  }, [controls]);

  const activityVariants = {
    walking: { opacity: 1, transition: { duration: 1 } },
    coding: { opacity: 1, transition: { duration: 1 } },
    'working with React Fiber and Three.js': { opacity: 1, transition: { duration: 1 } },
    hidden: { opacity: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="octopus">
      <motion.div
        className="head"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="eye left"></div>
        <div className="eye right"></div>
      </motion.div>
      <div className="tentacles">
        {[...Array(8)].map((_, index) => (
          <motion.div
            key={index}
            className={`tentacle tentacle-${index + 1}`}
            initial={{ rotate: 0 }}
            animate={{
              rotate: [0, 10, -10, 0],
              transition: {
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              },
            }}
          />
        ))}
      </div>
      <div className="activity">
        {activities.map((act) => (
          <motion.div
            key={act}
            className="activity-icon"
            variants={activityVariants}
            initial="hidden"
            animate={controls}
            custom={act}
          >
            {act === 'walking' && '🚶'}
            {act === 'coding' && '💻'}
            {act === 'working with React Fiber and Three.js' && (
              <Canvas>
                {/* Insert your Three.js scene here */}
                <ambientLight />
                <pointLight position={[10, 10, 10]} />
                <mesh>
                  <boxGeometry args={[1, 1, 1]} />
                  <meshStandardMaterial color="orange" />
                </mesh>
              </Canvas>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Octopus;
