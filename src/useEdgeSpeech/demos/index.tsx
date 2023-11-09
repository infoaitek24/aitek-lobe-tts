import { AudioPlayer, AudioVisualizer, getEdgeVoiceList, useEdgeSpeech } from '@lobehub/tts';
import { Icon, StoryBook, useControls, useCreateStore } from '@lobehub/ui';
import { Button, Input } from 'antd';
import { StopCircle, Volume2 } from 'lucide-react';
import { Flexbox } from 'react-layout-kit';

const defaultText = '这是一段使用 Edge Speech 的语音演示';

export default () => {
  const store = useCreateStore();

  const api: any = useControls(
    {
      key: {
        label: 'EDDGE_API_TOKEN',
        value: '',
      },
      proxy: {
        label: 'EDDGE_PROXY_URL',
        value: '',
      },
    },
    { store },
  );

  const options: any = useControls(
    {
      name: {
        options: getEdgeVoiceList(),
        value: 'zh-CN-YunxiaNeural',
      },
    },
    { store },
  );

  const { setText, isLoading, isPlaying, start, stop, audio } = useEdgeSpeech(defaultText, {
    api,
    ...options,
  });
  return (
    <StoryBook levaStore={store}>
      <Flexbox gap={8}>
        {isPlaying ? (
          <Button block icon={<Icon icon={StopCircle} />} onClick={stop}>
            Stop
          </Button>
        ) : isLoading ? (
          <Button block loading onClick={stop}>
            Generating...
          </Button>
        ) : (
          <Button block icon={<Icon icon={Volume2} />} onClick={start} type={'primary'}>
            Speak
          </Button>
        )}
        <Input.TextArea defaultValue={defaultText} onChange={(e) => setText(e.target.value)} />
        {audio && <AudioPlayer audio={audio} />}
        {audio && <AudioVisualizer audio={audio} />}
      </Flexbox>
    </StoryBook>
  );
};
