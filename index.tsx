import { useRef, useState, useEffect } from 'react';
import { Transition, View, useScrollTop } from 'vev';

export default function ({ className, children, event }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true)
  const [scroll, setScroll] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const scrolltop = useScrollTop(true)
  const pos = (View.scrollHeight * scrolltop)


  //if loaded, check last postition vs current position and set visible if scrolling up
  useEffect(() => {
    if (!loaded) return
    //  console.log("scroll trig", pos, scroll, visible)

    if (scroll < pos) {
      setVisible(!event)
      //     console.log("scrolldown")
    }

    if (scroll > pos) {
      setVisible(event)
      //    console.log("scrollup")
    }
    setScroll(pos)
  }, [pos])

  //Set loaded to true
  useEffect(() => {

    setLoaded(true)
  }, [])


  return (
    <div className={className} ref={ref}>
      <Transition show={visible}  >
        <div className="fill">{children}</div>
      </Transition>
    </div>
  );
}
