import { useRef, useState, useEffect } from 'react';
import { Transition, View, useScrollTop } from 'vev';

export default function ({ className, children, event }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true)
  const [scroll, setScroll] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const scrolltop = useScrollTop(true)
  const pos = (View.scrollHeight * scrolltop)


  // if loaded, check last postition vs current position to check wether you are scrolling up or down.
  useEffect(() => {
    if (!loaded) return

    // event is the form element togglebutton, a boolean default set to true. On the scrolldown event, it will be set to the opposite of it's value (!event).
    // This means that if you flip the event toggle button, it will set visible to true on scroll down and to false on scroll up.

    // Scroll down event:
    if (scroll < pos) {
  
      setVisible(!event)
    }
    // Scroll up event:
    if (scroll > pos) {
      setVisible(event)
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
