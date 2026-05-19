import { useEffect, useRef } from "react";
import * as THREE from "three";
import { MindARThree } from "mind-ar/dist/mindar-image-three.prod.js";

function MindARScanner({ posters, onTargetFound, onTargetLost, onError }) {
  const containerRef = useRef(null);
  const mindarThreeRef = useRef(null);
  const startedRef = useRef(false);

  useEffect(() => {
    let isMounted = true;

    async function startMindAR() {
      try {
        if (!containerRef.current) return;

        const mindarThree = new MindARThree({
          container: containerRef.current,
          imageTargetSrc: "/mind/targets.mind",
          maxTrack: 1,
        });

        mindarThreeRef.current = mindarThree;

        const { renderer, scene, camera } = mindarThree;

        posters.forEach((poster) => {
          if (poster.targetIndex === undefined || poster.targetIndex === null) {
            return;
          }

          const anchor = mindarThree.addAnchor(Number(poster.targetIndex));

          anchor.onTargetFound = () => {
            if (!isMounted) return;
            onTargetFound(poster);
          };

          anchor.onTargetLost = () => {
            if (!isMounted) return;
            if (onTargetLost) {
              onTargetLost(poster);
            }
          };

          const geometry = new THREE.PlaneGeometry(1, 0.25);
          const material = new THREE.MeshBasicMaterial({
            color: 0x1db954,
            transparent: true,
            opacity: 0.35,
          });

          const plane = new THREE.Mesh(geometry, material);
          plane.position.set(0, -0.65, 0);
          anchor.group.add(plane);
        });

        await mindarThree.start();

        if (!isMounted) {
          await mindarThree.stop();
          return;
        }

        startedRef.current = true;

        renderer.setAnimationLoop(() => {
          renderer.render(scene, camera);
        });
      } catch (error) {
        console.error(error);
        onError("이미지 인식 기능을 시작하지 못했습니다.");
      }
    }

    startMindAR();

    return () => {
      isMounted = false;

      const mindarThree = mindarThreeRef.current;

      if (mindarThree && startedRef.current) {
        try {
          mindarThree.renderer.setAnimationLoop(null);
          mindarThree.stop();
        } catch (error) {
          console.warn("MindAR 종료 중 경고:", error);
        }
      }

      mindarThreeRef.current = null;
      startedRef.current = false;
    };
  }, [posters, onTargetFound, onTargetLost, onError]);

  return <div ref={containerRef} className="mindar-container" />;
}

export default MindARScanner;