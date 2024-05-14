import { FaPlay, FaRegTrashAlt } from 'react-icons/fa/index';

import styles from './list.module.css';

import { usePresetStore, useSoundStore } from '@/store';

interface ListProps {
  close: () => void;
}

export function List({ close }: ListProps) {
  const presets = usePresetStore(state => state.presets);
  const changeName = usePresetStore(state => state.changeName);
  const deletePreset = usePresetStore(state => state.deletePreset);
  const override = useSoundStore(state => state.override);
  const play = useSoundStore(state => state.play);

  return (
    <div className={styles.list}>
      <h3 className={styles.title}>
        Your Presets {presets.length > 0 && `(${presets.length})`}
      </h3>

      {!presets.length && (
        <p className={styles.empty}>You don&apos;t have any presets yet.</p>
      )}

      {presets.map((preset, index) => (
        <div className={styles.preset} key={index}>
          <input
            placeholder="Untitled"
            type="text"
            value={preset.label}
            onChange={e => changeName(index, e.target.value)}
          />
          <button onClick={() => deletePreset(index)}>
            <FaRegTrashAlt />
          </button>
          <button
            className={styles.primary}
            onClick={() => {
              override(preset.sounds);
              play();
              close();
            }}
          >
            <FaPlay />
          </button>
        </div>
      ))}
    </div>
  );
}
