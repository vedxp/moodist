import { useCallback, useEffect, forwardRef } from 'react';
import { ImSpinner9 } from 'react-icons/im/index';

import { Range } from './range';
import { Favorite } from './favorite';

import { useSound } from '@/hooks/use-sound';
import { useSoundStore, useLoadingStore } from '@/store';
import { cn } from '@/helpers/styles';

import styles from './sound.module.css';

import type { Sound as SoundType } from '@/data/types';

import { useKeyboardButton } from '@/hooks/use-keyboard-button';

interface SoundProps extends SoundType {
  functional: boolean;
  hidden: boolean;
  selectHidden: (key: string) => void;
  unselectHidden: (key: string) => void;
}

export const Sound = forwardRef<HTMLDivElement, SoundProps>(function Sound(
  { functional, hidden, icon, id, label, selectHidden, src, unselectHidden },
  ref,
) {
  const isPlaying = useSoundStore(state => state.isPlaying);
  const play = useSoundStore(state => state.play);
  const select = useSoundStore(state => state.select);
  const unselect = useSoundStore(state => state.unselect);
  const setVolume = useSoundStore(state => state.setVolume);
  const volume = useSoundStore(state => state.sounds[id].volume);
  const isSelected = useSoundStore(state => state.sounds[id].isSelected);
  const locked = useSoundStore(state => state.locked);

  const isLoading = useLoadingStore(state => state.loaders[src]);

  const sound = useSound(src, { loop: true, volume });

  useEffect(() => {
    if (locked) return;

    if (isSelected && isPlaying && functional) {
      sound?.play();
    } else {
      sound?.pause();
    }
  }, [isSelected, sound, isPlaying, functional, locked]);

  useEffect(() => {
    if (hidden && isSelected) selectHidden(label);
    else if (hidden && !isSelected) unselectHidden(label);
  }, [label, isSelected, hidden, selectHidden, unselectHidden]);

  const _select = useCallback(() => {
    if (locked) return;
    select(id);
    play();
  }, [select, play, id, locked]);

  const _unselect = useCallback(() => {
    if (locked) return;
    unselect(id);
    setVolume(id, 0.5);
  }, [unselect, setVolume, id, locked]);

  const toggle = useCallback(() => {
    if (locked) return;
    if (isSelected) _unselect();
    else _select();
  }, [isSelected, _select, _unselect, locked]);

  const handleClick = useCallback(() => {
    toggle();
  }, [toggle]);

  const handleKeyDown = useKeyboardButton(() => {
    toggle();
  });

  return (
    <div
      aria-label={`${label} sound`}
      ref={ref}
      role="button"
      tabIndex={0}
      className={cn(
        styles.sound,
        isSelected && styles.selected,
        hidden && styles.hidden,
      )}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      <Favorite id={id} label={label} />
      <div className={styles.icon}>
        {isLoading ? (
          <span className={styles.spinner}>
            <ImSpinner9 />
          </span>
        ) : (
          icon
        )}
      </div>
      <div className={styles.label} id={id}>
        {label}
      </div>
      <Range id={id} label={label} />
    </div>
  );
});
