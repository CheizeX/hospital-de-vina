/* eslint-disable react/jsx-props-no-spreading */

import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { ReactSVG } from 'react-svg';
import { MdAssignmentReturn } from 'react-icons/md';
import { SpinnerRoundFilled } from 'spinners-react';
import RobotAvatar from '../../../assets/vina/logo.png';
import { webchatProps } from '../../WebChat/Webchat';
import { Message, SuggestionsProps } from '../../shared';
import { initialMessage, suggestionsObjNew } from '../../extra';

export const ChatBox: FC<webchatProps> = function ({ messages }) {
  const dialogueBoxRef = useRef<HTMLDivElement>(null);
  const [loadingMessage, setLoadingMessage] = useState(false);
  const [lastTime, setLastTime] = useState('');
  const [suggestions, setSuggestions] = useState(suggestionsObjNew);
  const [automatedMessages, setAutomatedMessages] =
    useState<Message[]>(initialMessage);

  const scrollToBottom = useCallback(() => {
    dialogueBoxRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [dialogueBoxRef]);

  const handleAutomatedMessages = (suggestion: any) => {
    const currentTime = new Date();
    localStorage.setItem('lastTime', JSON.stringify(currentTime.getTime()));

    const newSuggestions = suggestion.subItems?.filter((item: any) => item);
    if (newSuggestions) {
      setSuggestions(newSuggestions);
    } else {
      setSuggestions(
        suggestions.filter((item: any) => item.name !== suggestion.name),
      );
    }

    setAutomatedMessages([
      ...automatedMessages,
      {
        _id: suggestion.name,
        contentType: 'TEXT',
        from: 'USER',
        content: suggestion.name,
      },
    ]);

    if (!suggestion.subItems) {
      setLoadingMessage(true);
      setTimeout(() => {
        setAutomatedMessages([
          ...automatedMessages,
          {
            _id: suggestion.name,
            contentType: 'TEXT',
            from: 'USER',
            content: suggestion.name,
            icon: suggestion.icon,
          },
          ...suggestion.options.map((option: any) => ({
            _id: option.name,
            contentType: 'TEXT',
            from: 'AGENT',
            content: option.text,
            icon: option.icon,
            link: option.link,
          })),
        ]);
        setLoadingMessage(false);
        scrollToBottom();
      }, 2000);
      setLastTime(localStorage.getItem('lastTime'));
    }
  };

  useEffect(scrollToBottom, [
    scrollToBottom,
    messages,
    automatedMessages,
    setSuggestions,
  ]);

  return (
    <div className="chat-box__ewc-class">
      <div className="dialogues-box__ewc-class">
        {automatedMessages &&
          automatedMessages.map((message, index) =>
            message.from === 'AGENT' ? (
              <div key={index.toString()}>
                <div className="bot-dialogue__ewc-class">
                  <div className="bot-image-container__ewc-class">
                    {message.icon ? (
                      <ReactSVG
                        className="bot-svg-and-icon__ewc-class"
                        src={message.icon}
                      />
                    ) : (
                      <img
                        className="bot-image__ewc-class"
                        src={RobotAvatar}
                        alt=""
                      />
                    )}
                  </div>

                  <div
                    className={
                      message.contentType === 'ATTACHMENT'
                        ? 'bot-text-container__ewc-class clickable-bot__ewc-class'
                        : 'bot-text-container__ewc-class'
                    }>
                    <span className="bot-text__ewc-class">
                      {message.contentType === 'TEXT' && message.link ? (
                        <a href={message.link} target="_blank" rel="noreferrer">
                          {message.content}
                        </a>
                      ) : (
                        message.content
                      )}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div key={index.toString()}>
                <div className="user-dialogue__ewc-class">
                  <div
                    className={
                      message.contentType === 'ATTACHMENT'
                        ? 'user-dialogue-container__ewc-class clickable-user__ewc-class'
                        : 'user-dialogue-container__ewc-class'
                    }>
                    {message.contentType === 'TEXT' && message.content}
                  </div>
                </div>
              </div>
            ),
          )}
        {lastTime && !loadingMessage && (
          <div className="auto-time__ewc-class">
            {new Date(
              JSON.parse(localStorage.getItem('lastTime')),
            ).toLocaleTimeString('en-US', {
              hour: 'numeric',
              minute: 'numeric',
              hour12: true,
            })}
          </div>
        )}

        {!loadingMessage ? (
          <div className="automatized-text-container__ewc-class">
            {JSON.stringify(suggestions) !==
              JSON.stringify(suggestionsObjNew) && (
              <button
                className="automatized-text-back__ewc-class"
                key="xxx"
                type="button"
                onClick={() =>
                  handleAutomatedMessages({
                    name: 'Menú Principal',
                    subItems: suggestionsObjNew,
                  })
                }>
                <MdAssignmentReturn />
                Regresar al Menú Principal
              </button>
            )}
            {suggestions.map((sugg, index) => (
              <button
                className="automatized-text__ewc-class"
                key={index.toString()}
                type="button"
                onClick={() => {
                  handleAutomatedMessages(sugg as SuggestionsProps);
                }}>
                {sugg.icon && (
                  <ReactSVG classNmae="svg-logo_ewc-class" src={sugg.icon} />
                )}
                {sugg.name}
              </button>
            ))}
          </div>
        ) : (
          <div className="spinner-before-suggestions__ewc-class">
            <SpinnerRoundFilled
              size={25}
              thickness={120}
              speed={180}
              color={processEnv.mainColor}
            />
          </div>
        )}
        <div
          ref={dialogueBoxRef}
          style={{
            marginTop: '20px',
          }}
        />
      </div>
    </div>
  );
};
