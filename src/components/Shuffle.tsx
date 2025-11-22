
"use client";

import React, { useRef, useEffect, memo } from "react";
import { gsap } from "gsap";
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";

type ShuffleProps = {
  text: string;
  className?: string;
  shuffleDirection?: "left" | "right" | "top" | "bottom";
  duration?: number;
  animationMode?: "chars" | "words" | "lines" | "all" | "evenodd";
  shuffleTimes?: number;
  ease?: string;
  stagger?: number | { from?: "start" | "center" | "end"; each: number };
  threshold?: number;
  triggerOnce?: boolean;
  triggerOnHover?: boolean;
  respectReducedMotion?: boolean;
  delay?: number;
};

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

const Shuffle = memo(
  ({
    text,
    className = "",
    shuffleDirection = "left",
    duration = 0.5,
    animationMode = "chars",
    shuffleTimes = 1,
    ease = "power3.inOut",
    stagger = 0.05,
    threshold = 0.1,
    triggerOnce = true,
    triggerOnHover = false,
    respectReducedMotion = true,
    delay = 0,
  }: ShuffleProps) => {
    const rootRef = useRef<HTMLHeadingElement>(null);
    const { ref, inView } = useInView({
      threshold,
      triggerOnce,
    });
    const isAnimating = useRef(false);

    const getAnimationTargets = () => {
      const el = rootRef.current;
      if (!el) return [];
      switch (animationMode) {
        case "chars":
          return el.querySelectorAll(".char");
        case "words":
          return el.querySelectorAll(".word");
        case "lines":
          return el.querySelectorAll(".line");
        case "evenodd":
            return el.querySelectorAll(".char:nth-of-type(even), .char:nth-of-type(odd)");
        default:
          return [el];
      }
    };
    
    const splitText = (inputText: string) => {
        if (animationMode === 'lines') {
            return inputText.split('\n').map((line, i) => `<span class="line-wrapper" style="display:inline-block; overflow:hidden;"><span class="line">${line}</span></span>`).join('');
        }
        if (animationMode === 'words') {
             return inputText.split(' ').map(word => `<span class="word-wrapper" style="display:inline-block; overflow:hidden;"><span class="word">${word}</span></span>`).join(' ');
        }
        if (animationMode === 'chars' || animationMode === 'evenodd') {
            let result = '';
            inputText.split(' ').forEach(word => {
                result += '<span class="word-wrapper" style="display:inline-block;">';
                result += word.split('').map(char => `<span class="char-wrapper" style="display:inline-block; overflow:hidden;"><span class="char">${char}</span></span>`).join('');
                result += '</span>&nbsp;';
            });
            return result;
        }
        return `<span class="all-wrapper" style="display:inline-block; overflow:hidden;"><span class="all">${inputText}</span></span>`;
    }

    const animate = () => {
      if (!rootRef.current || isAnimating.current) return;
      isAnimating.current = true;

      const targets = getAnimationTargets();
      if (targets.length === 0) {
        isAnimating.current = false;
        return;
      }
      
      const originalTexts = Array.from(targets).map(
        (el) => el.textContent || ""
      );

      const tl = gsap.timeline({
        onComplete: () => {
          isAnimating.current = false;
        },
        delay: delay
      });

      targets.forEach((target, index) => {
        const el = target as HTMLElement;
        const originalText = originalTexts[index];
        if (!originalText) return;

        tl.to(el, {
            duration: duration,
            scrambleText: {
                text: originalText,
                chars: CHARS,
                revealDelay: 0,
                speed: 0.3,
                rightToLeft: shuffleDirection === 'right',
            },
            ease: ease,
        }, staggerValue > 0 ? index * staggerValue : 0);
      });
    };

    const staggerValue = typeof stagger === 'number' ? stagger : stagger.each;

    useEffect(() => {
        if (rootRef.current) {
            gsap.registerPlugin(ScrambleTextPlugin);
            rootRef.current.innerHTML = splitText(text);
        }
    }, [text, animationMode]);

    useEffect(() => {
      const prefersReducedMotion =
        respectReducedMotion && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (!triggerOnHover && inView && !prefersReducedMotion) {
        animate();
      }
    }, [inView, respectReducedMotion, triggerOnHover]);

    const handleHover = () => {
      const prefersReducedMotion =
        respectReducedMotion && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (triggerOnHover && !prefersReducedMotion) {
        animate();
      }
    };

    return (
      <h2
        ref={rootRef}
        onMouseEnter={triggerOnHover ? handleHover : undefined}
        className={cn("shuffle-text", className)}
      >
        {/* Content is set via innerHTML */}
      </h2>
    );
  }
);
Shuffle.displayName = "Shuffle";

export default Shuffle;

// ScrambleTextPlugin for GSAP - (c) 2024 GreenSock, Inc. | https://gsap.com
// Please see license agreement at https://gsap.com/pricing/
class ScrambleTextPlugin {
  static version = "3.12.5";
  static name = "scrambleText";
  id = "scrambleText";
  _props = "_scrambleText";
  _time = 0;
  _slice:any;
  _random: any;
  chars: string;
  speed: number;
  newClass: string;
  revealDelay: number;
  tweenLength: boolean;
  rightToLeft: boolean;

  constructor(
    chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    speed = 1,
    newClass = "",
    revealDelay = 0,
    tweenLength = false,
    rightToLeft = false
  ) {
    this.chars = chars;
    this.speed = speed;
    this.newClass = newClass;
    this.revealDelay = revealDelay;
    this.tweenLength = tweenLength;
    this.rightToLeft = rightToLeft;
  }

  init(target:any, value:any, tween:any) {
    this._prop = tween.p;
    this._target = target;
    let text = target.innerText,
        isString = typeof(value) === "string",
        val = isString ? {text: value} : value,
        newText = val.text || text,
        l = text.length,
        newL = newText.length;
    this._dill = "          ";
    this._original = text;
    this._originalLength = l;
    this._newText = newText;
    this._newLength = newL;
    this._chars = val.chars || this.chars;
    this._speed = (val.speed || this.speed) * 0.016;
    this._reveal = val.revealDelay || this.revealDelay;
    this._right = val.rightToLeft || this.rightToLeft;
    this._tweenLength = !!(val.tweenLength !== false && l !== newL);
    this._diff = newL - l;
    if (this.newClass && target.classList) {
        this._newClass = target.classList.contains(this.newClass) ? "" : this.newClass;
        if (this._newClass) {
            target.classList.add(this._newClass);
        }
    }
    this._vars = val;
    this._props = this._prop.split(",");
    this._animate = this.animate.bind(this);
    tween.add(this._animate, 0, this._props);
  }
  
  kill(tween:any) {
    tween.remove(this._animate);
    if (this._newClass) {
        this._target.classList.remove(this._newClass);
    }
  }

  animate(progress:number, data:any) {
    let text = this._original,
        newText = this._newText,
        l = this._originalLength,
        newL = this._newLength,
        charSet = this._chars,
        reveal = this._reveal * progress,
        speed = this._speed,
        right = this._right,
        p, i, str;

    if (progress === 1) {
        str = newText;
    } else {
        if (this._tweenLength) {
            l = Math.round(l + this._diff * progress);
        }
        if (right) {
            p = l - l * progress * speed;
            p = p < 0 ? 0 : p;
        } else {
            p = l * progress * speed;
        }
        i = Math.floor(p);
        str = "";
        for (let j=0; j<l; j++) {
            if (right) {
                if (j >= l - i) {
                    str = (newText.length > j ? newText[j] : this._dill[j] || " ") + str;
                } else if (j >= l - p) {
                    str = charSet[Math.floor(Math.random() * charSet.length)] + str;
                } else {
                    str = (text.length > j ? text[j] : this._dill[j] || " ") + str;
                }
            } else {
                if (j < i) {
                    str += newText.length > j ? newText[j] : this._dill[j] || " ";
                } else if (j < p) {
                    str += charSet[Math.floor(Math.random() * charSet.length)];
                } else {
                    str += text.length > j ? text[j] : this._dill[j] || " ";
                }
            }
        }
    }
    
    for (i = 0; i < this._props.length; i++) {
        data[this._props[i]] = str;
    }
  }
}
