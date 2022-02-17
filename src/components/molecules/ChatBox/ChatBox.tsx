/* eslint-disable react/jsx-props-no-spreading */
// import axios from 'axios';
// import { Link } from 'react-router-dom';
import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { ReactSVG } from 'react-svg';
// import Swal from 'sweetalert2';
// import { SpinnerCircularFixed } from 'spinners-react';
import {
  // FaFileDownload,
  FaWindowClose,
} from 'react-icons/fa';
import { CgMaximizeAlt } from 'react-icons/cg';
// import UserSVG from '../../../assets/user.svg';
// import { addAbortSignal } from 'stream';
import { SpinnerRoundFilled } from 'spinners-react';
import RobotAvatar from '../../../assets/vina/logo.png';
import { webchatProps } from '../../WebChat/Webchat';
import { Message } from '../../shared';
import { initialMessage, suggestionsObj } from '../../extra';

export const ChatBox: FC<webchatProps> = function ({
  messages,
  //  agentName
}) {
  const dialogueBoxRef = useRef<HTMLDivElement>(null);
  // const [loading, setLoading] = useState(false);
  const [maximizedFile, setMaximizedFile] = useState('');

  const [loadingMessage, setLoadingMessage] = useState(false);
  const [lastTime, setLastTime] = useState('');
  // const [activeSelection, setAvtiveSelection] = useState('');
  const [suggestions, setSuggestions] = useState(suggestionsObj);
  const [automatedMessages, setAutomatedMessages] =
    useState<Message[]>(initialMessage);

  const scrollToBottom = useCallback(() => {
    dialogueBoxRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [dialogueBoxRef]);

  const handleAutomatedMessages = (suggestion: any) => {
    // eliminar la suggestions que su nombre coincida con activeSelection:
    const currentTime = new Date();
    localStorage.setItem('lastTime', JSON.stringify(currentTime.getTime()));
    // setAvtiveSelection(suggestion.name);
    setSuggestions(
      suggestionsObj.filter(
        (suggestionItem: any) => suggestionItem.name !== suggestion.name,
      ),
    );
    setAutomatedMessages([
      ...automatedMessages,
      {
        _id: suggestion.name,
        contentType: 'TEXT',
        from: 'USER',
        content: suggestion.name,
      },
    ]);
    // esperar 1 segundo antes de enviar el siguiente mensaje
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
          _id: option.text,
          contentType: 'TEXT',
          from: 'AGENT',
          content: option.text,
          icon: option.icon,
          link: option.link,
        })),
      ]);
      // setLastTime(new Date());
      setLoadingMessage(false);
      scrollToBottom();
    }, 2000);
    setLastTime(localStorage.getItem('lastTime'));
  };

  // const handleDownloadFile = async (file: string, chatId: string) => {
  //   try {
  //     setLoading(true);
  //     const response = await axios({
  //       url: `${processEnv.restUrl}/webchat/file/${chatId}/${file}`,
  //       method: 'get',
  //       responseType: 'blob',
  //     });
  //     const url = window.URL.createObjectURL(new Blob([response.data]));
  //     const link = document.createElement('a');
  //     link.href = url;
  //     link.setAttribute('download', file);
  //     document.body.appendChild(link);
  //     link.click();
  //     link.remove();
  //   } catch (error) {
  //     Swal.fire({
  //       title:
  //         'Estamos experimentando inconvenientes técnicos para descargar el archivo.',
  //       confirmButtonText: 'OK',
  //       confirmButtonColor: processEnv.mainColor,
  //       customClass: {
  //         popup: 'animated animate__fadeInDown',
  //       },
  //     });
  //   }
  //   setLoading(false);
  // };

  useEffect(scrollToBottom, [scrollToBottom, messages, automatedMessages]);

  return (
    <div className="chat-box__ewc-class">
      <div className="dialogues-box__ewc-class">
        {/* <div>
          <div className="bot-dialogue__ewc-class">
            <div className="bot-image-container__ewc-class">
              <img
                className="bot-image__ewc-class"
                src={agentName === '' ? RobotAvatar : UserSVG}
                alt=""
              />
            </div>
            <div className="bot-text-container__ewc-class">
              <p className="bot-text__ewc-class">
                Hola {sessionStorage.getItem('webchat_elipse_name')}, estoy aquí
                para ayudarte!. Elige alguna de las siguientes opciones:
              </p>
            </div>
          </div>
          <div className="bot-time__ewc-class">
            {' '}
            {new Date().toLocaleTimeString('en-US', {
              hour: 'numeric',
              minute: 'numeric',
              hour12: true,
            })}
          </div>
        </div> */}
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
                        // src={agentName === '' ? RobotAvatar : UserSVG}
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
                      {message.contentType === 'ATTACHMENT' &&
                        message.content.substring(
                          message.content.length - 3,
                          message.content.length,
                        ) !== 'pdf' && (
                          <img
                            className="bot-image-uploaded__ewc-class"
                            src={`${
                              processEnv.restUrl
                            }/webchat/file/${sessionStorage.getItem(
                              'chatId',
                            )}/${message.content.substring(
                              39,
                              message.content.length,
                            )}`}
                            alt="img"
                          />
                        )}

                      {message.contentType === 'ATTACHMENT' &&
                        message.content.substring(
                          message.content.length - 3,
                          message.content.length,
                        ) === 'pdf' && (
                          <iframe
                            className="bot-image-uploaded__ewc-class"
                            src={`${
                              processEnv.restUrl
                            }/webchat/file/${sessionStorage.getItem(
                              'chatId',
                            )}/${message.content.substring(
                              39,
                              message.content.length,
                            )}`}
                            width="100px"
                            height="100px"
                            style={{
                              overflow: 'hidden',
                            }}
                            title="pdf"
                          />
                        )}

                      {message.contentType === 'ATTACHMENT' &&
                        message.content.substring(
                          message.content.length - 3,
                          message.content.length,
                        ) && (
                          <div className="maximize-and-download-container__ewc-class">
                            <button
                              type="button"
                              onClick={() => setMaximizedFile(message._id)}>
                              <CgMaximizeAlt className="bot-file-maximize__ewc-class" />
                            </button>
                            <button
                              type="button"
                              // onClick={() =>
                              //   handleDownloadFile(
                              //     message.content.split('/')[3],
                              //     sessionStorage?.getItem('chatId'),
                              //   )
                              // }
                            >
                              {/* {loading ? (
                                <SpinnerCircularFixed
                                  size={20}
                                  thickness={250}
                                  color="#ffff"
                                />
                              ) : (
                                <FaFileDownload className="bot-file-download__ewc-class" />
                              )} */}
                            </button>
                          </div>
                        )}
                      {message.contentType === 'TEXT' && message.link ? (
                        <a href={message.link} target="_blank" rel="noreferrer">
                          {message.content}
                        </a>
                      ) : (
                        message.content
                      )}
                    </span>
                    {maximizedFile === message._id && (
                      <article className="maximized-file-modal__ewc-class">
                        <button
                          type="button"
                          className="minimize-image-button__ewc-class"
                          onClick={() => setMaximizedFile('')}>
                          <FaWindowClose />
                        </button>

                        {message.contentType === 'ATTACHMENT' &&
                        message.content.substring(
                          message.content.length - 3,
                          message.content.length,
                        ) === 'pdf' ? (
                          <iframe
                            className="bot-image-uploaded__ewc-class"
                            src={`${
                              processEnv.restUrl
                            }/webchat/file/${sessionStorage.getItem(
                              'chatId',
                            )}/${message.content.substring(
                              39,
                              message.content.length,
                            )}`}
                            width="85%"
                            height="100%"
                            title={`${
                              processEnv.restUrl
                            }/webchat/file/${sessionStorage.getItem(
                              'chatId',
                            )}/${message.content.substring(
                              39,
                              message.content.length,
                            )}`}
                          />
                        ) : (
                          <img
                            className="bot-image-maximized__ewc-class"
                            src={`${
                              processEnv.restUrl
                            }/webchat/file/${sessionStorage.getItem(
                              'chatId',
                            )}/${message.content.substring(
                              39,
                              message.content.length,
                            )}`}
                            alt="maximized file"
                          />
                        )}
                      </article>
                    )}
                  </div>
                </div>
                {/* <div className="bot-time__ewc-class">
                  {' '}
                  {new Date(message.createdAt).toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true,
                  })}
                </div> */}
              </div>
            ) : (
              <div key={index.toString()}>
                <div className="user-dialogue__ewc-class">
                  {maximizedFile === message._id && (
                    <article className="maximized-file-modal__ewc-class">
                      <button
                        type="button"
                        className="minimize-image-button__ewc-class"
                        onClick={() => setMaximizedFile('')}>
                        <FaWindowClose />
                      </button>
                      {message.contentType === 'ATTACHMENT' &&
                      message.content.substring(
                        message.content.length - 3,
                        message.content.length,
                      ) === 'pdf' ? (
                        <iframe
                          className="bot-image-uploaded__ewc-class"
                          src={`${
                            processEnv.restUrl
                          }/webchat/file/${sessionStorage.getItem(
                            'chatId',
                          )}/${message.content.substring(
                            39,
                            message.content.length,
                          )}`}
                          width="85%"
                          height="100%"
                          title={`${
                            processEnv.restUrl
                          }/webchat/file/${sessionStorage.getItem(
                            'chatId',
                          )}/${message.content.substring(
                            39,
                            message.content.length,
                          )}`}
                        />
                      ) : (
                        <img
                          className="bot-image-maximized__ewc-class"
                          src={`${
                            processEnv.restUrl
                          }/webchat/file/${sessionStorage.getItem(
                            'chatId',
                          )}/${message.content.substring(
                            39,
                            message.content.length,
                          )}`}
                          alt="maximized file"
                        />
                      )}
                    </article>
                  )}

                  <div
                    className={
                      message.contentType === 'ATTACHMENT'
                        ? 'user-dialogue-container__ewc-class clickable-user__ewc-class'
                        : 'user-dialogue-container__ewc-class'
                    }>
                    {message.contentType === 'TEXT' && message.content}

                    {message.contentType === 'ATTACHMENT' &&
                      message.content.substring(
                        message.content.length - 3,
                        message.content.length,
                      ) !== 'pdf' && (
                        <>
                          <img
                            className="user-image-uploaded__ewc-class"
                            src={`${
                              processEnv.restUrl
                            }/webchat/file/${sessionStorage.getItem(
                              'chatId',
                            )}/${message.content.substring(
                              39,
                              message.content.length,
                            )}`}
                            alt="img"
                          />
                          <div className="maximize-and-download-container__ewc-class user-maximize-and-download-container__ewc-class">
                            <button
                              type="button"
                              onClick={() => setMaximizedFile(message._id)}>
                              <CgMaximizeAlt className="bot-file-maximize__ewc-class" />
                            </button>
                          </div>
                        </>
                      )}

                    {message.contentType === 'ATTACHMENT' &&
                      message.content.substring(
                        message.content.length - 3,
                        message.content.length,
                      ) === 'pdf' && (
                        <>
                          <iframe
                            className="bot-image-uploaded__ewc-class"
                            src={`${
                              processEnv.restUrl
                            }/webchat/file/${sessionStorage.getItem(
                              'chatId',
                            )}/${message.content.substring(
                              39,
                              message.content.length,
                            )}`}
                            width="100px"
                            height="100px"
                            style={{
                              overflow: 'hidden',
                            }}
                            title="pdf"
                          />
                          <div className="maximize-and-download-container__ewc-class user-maximize-and-download-container__ewc-class">
                            <button
                              type="button"
                              onClick={() => setMaximizedFile(message._id)}>
                              <CgMaximizeAlt className="bot-file-maximize__ewc-class" />
                            </button>
                          </div>
                        </>
                      )}
                  </div>
                </div>
                {/* <div className="user-time__ewc-class">
                  {new Date(message.createdAt).toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true,
                  })}
                </div> */}
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
            {suggestions.map((suggestion, index) => (
              <button
                className="automatized-text__ewc-class"
                key={index.toString()}
                type="button"
                onClick={() => {
                  handleAutomatedMessages(suggestion);
                }}>
                {suggestion.icon && (
                  <ReactSVG
                    classNmae="svg-logo_ewc-class"
                    src={suggestion.icon}
                  />
                )}
                {suggestion.name}
              </button>
            ))}
          </div>
        ) : (
          <div className="spinner-before-suggestions__ewc-class">
            <SpinnerRoundFilled
              size={25}
              thickness={120}
              speed={180}
              color="#2F55B9"
            />
          </div>
        )}
        <div ref={dialogueBoxRef} />
      </div>
    </div>
  );
};
