import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import $ from 'jquery';
import {
    View,
    Panel,
    PanelHeader,
    Cell,
    Group,
    PanelHeaderBack,
    Card, CardGrid, Avatar, Button, Header, FixedLayout, ModalRoot, ModalCard
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import Icon28BrainOutline from '@vkontakte/icons/dist/28/brain_outline';
import bridge from '@vkontakte/vk-bridge';

function randInt(min, max) {
    // получить случайное число от (min-0.5) до (max+0.5)
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}

const IconSad = (p) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" width={p.size} height={p.size} viewBox="0 0 64 64">
            <path d="M2.5 37.2c2.9 16.3 18.4 27.2 34.8 24.3c16.3-2.9 27.2-18.4 24.3-34.8C58.7 10.5 43.1-.4 26.8 2.5C10.5 5.3-.4 20.9 2.5 37.2" fill="#ffdd67"/>
            <g fill="#664e27">
                <circle cx="42.4" cy="24.7" r="5"/>
                <circle cx="19.7" cy="28.7" r="5"/>
                <path d="M43.3 41.8c-5.8-1.5-12-.4-16.9 3c-1.2.9 1.1 4 2.3 3.2c3.2-2.3 8.4-3.8 13.7-2.4c1.3.3 2.4-3.3.9-3.8"/>
            </g>
            <rect x="0" y="0" width="64" height="64" fill="rgba(0, 0, 0, 0)" />
        </svg>
    )
}

const IconClown = (p) => {
     return (
         <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" width={p.size} height={p.size} viewBox="0 0 64 64">
             <path d="M62 27.2c0-3-1.5-5.6-3.9-7.1c.3-.9.5-1.9.5-2.9c0-4.7-3.7-8.6-8.3-8.7C49 6 46.4 4.2 43.4 4.2c-1.5 0-2.9.4-4.1 1.2C37.8 3.4 35.1 2 32 2c-3.1 0-5.8 1.4-7.4 3.4c-1.2-.8-2.6-1.2-4.1-1.2c-3 0-5.6 1.7-6.9 4.3c-4.6.1-8.3 3.9-8.3 8.7c0 1 .2 2 .5 2.9C3.5 21.6 2 24.2 2 27.2c0 2 .7 3.9 1.9 5.4c-.5 1-.8 2.1-.8 3.3c0 2.7 1.5 5.1 3.7 6.3c0 .3-.1.5-.1.8c0 3.9 3.1 7.1 6.9 7.1h36.7c3.8 0 6.9-3.2 6.9-7.1v-.8c2.2-1.2 3.7-3.6 3.7-6.3c0-1.2-.3-2.3-.8-3.3c1.2-1.5 1.9-3.3 1.9-5.4" fill="#42ade2"/>
             <path d="M51.8 35c-.1.9-.3 1.8-.6 2.3c-.5.9-1.4 1.4-1.4 1.4s.3-.9.2-3.4c-1.3-19.9-3.7-11-17.9-11s-16.6-8.9-17.9 11c-.1 2.5.2 3.4.2 3.4s-.9-.5-1.4-1.4c-.3-.5-.4-1.3-.6-2.3c-1.5-.4-3.5-.1-3.5 4.3c0 2.7 1 5 4.4 5.2c1.4 11 5.7 12.8 14.3 16.7c2.3 1 6.9 1 9.1 0c8.6-3.9 12.9-5.7 14.3-16.7c3.4-.2 4.4-2.5 4.4-5.2c-.2-4.4-2.1-4.7-3.6-4.3" fill="#fed0ac"/>
             <path d="M49.1 35.5c-1.3-19.2-3.5-9.9-17.1-9.9s-15.8-9.3-17.1 9.9c-.1 2.4.4 6.7.7 8.9c.8 5.2 3.9 12.2 12 16c2.2 1 6.6 1 8.7 0c8.2-3.7 11.3-10.8 12-16c.4-2.3.9-6.6.8-8.9" fill="#f5f5f5"/>
             <path d="M41.2 49.3c-3.8 3.9-3.3 8.8-9.2 8.8c-5.9 0-5.4-4.9-9.2-8.8c-3.7-3.9 5.1.5 9.2.5s12.9-4.4 9.2-.5" fill="#574137"/>
             <path d="M38.9 48.2L32 49.8l-6.9-1.6s-.2 1.6.5 2.3c1 1 4.8 1.5 6.5 1.5c1.7 0 5.4-.5 6.5-1.5c.5-.6.3-2.3.3-2.3" fill="#fff"/>
             <path d="M32 55.1c-2.8 0-3.7 2-3.7 2l3.7.6l3.7-.6s-.9-2-3.7-2" fill="#ff717f"/>
             <path d="M32 49c-2.3 0-15.8-5-9.9.6c3.2 3 3.2 10 9.9 10s6.7-6.9 9.9-10c5.9-5.6-7.6-.6-9.9-.6m7.9 1.1c-3.3 3.3-2.8 7.3-7.9 7.4c-5.1 0-4.6-4.1-7.9-7.4c-3.2-3.2 4.4.4 7.9.4s11.1-3.7 7.9-.4" fill="#cf4350"/>
             <circle cx="32" cy="43.4" r="6.6" fill="#ff5263"/>
             <path d="M27 35.8c0 2.9-8 2.9-8 0c0-9.9 8-9.9 8 0" fill="#f5f5f5"/>
             <path d="M27.7 36.2c0 3.7-10 3.7-10 0c0-12.3 10-12.3 10 0" fill="#3e4347"/>
             <path d="M27.4 36.3c0 2.9-8 2.9-8 0c0-9.9 8-9.9 8 0" fill="#f5f5f5"/>
             <ellipse cx="23.7" cy="34.5" rx="2.5" ry="3.5" fill="#0a84a5"/>
             <circle cx="23.7" cy="34.5" r=".8" fill="#231f20"/>
             <path d="M36.3 36.2c0 3.7 10 3.7 10 0c0-12.3-10-12.3-10 0" fill="#3e4347"/>
             <path d="M36.6 36.3c0 2.9 8 2.9 8 0c0-9.9-8-9.9-8 0" fill="#f5f5f5"/>
             <ellipse cx="40.3" cy="34.5" rx="2.5" ry="3.5" fill="#0a84a5"/>
             <circle cx="40.3" cy="34.5" r=".8" fill="#231f20"/>
             <rect x="0" y="0" width="64" height="64" fill="rgba(0, 0, 0, 0)" />
         </svg>
     )
}

const IconRobot = (p) => {
    return (<svg xmlns="http://www.w3.org/2000/svg"  aria-hidden="true" focusable="false" width={p.size} height={p.size} viewBox="0 0 64 64">
        <path d="M57.6 13.7c-.7-1-1.6-1.7-2.7-2.2c-3.4-1.7-11.6-1.3-12.3-5.7c-.9-5.7-5.9.1-6.8.1c-1.1 0-1.6-3.9-3.7-3.9c-2.2 0-2.7 3.9-3.7 3.9c-.9 0-5.9-5.8-6.8-.1c-.7 4.3-9 4-12.3 5.7c-1 .5-2 1.2-2.7 2.2c-.5.8.6 1.6 1.2.9c1.6-2 4.8-2.4 7.1-2.8c1.9-.4 4-.6 5.9-1.4c2.6-1 2.5-4.9 3.3-4.9c.6 0 2.7 3 4.5 3c1.6 0 2.6-3.7 3.5-3.7c.9 0 1.9 3.7 3.5 3.7c1.9 0 4-3 4.6-3c.8 0 .7 3.9 3.3 4.9c1.8.8 3.9 1 5.9 1.4c2.3.5 5.6.8 7.1 2.8c.5.7 1.6-.2 1.1-.9" fill="#00b9f1"/>
        <path d="M53 57c0 2.8-2.2 5-5 5H16c-2.8 0-5-2.2-5-5V36h42v21z" fill="#89967a"/>
        <path d="M32 12c-15.5 0-21 8.5-21 24v21h42V36c0-15.5-5.5-24-21-24" fill="#b6c4a7"/>
        <g fill="#89967a">
            <path d="M11 55c-1.1 0-2-1.2-2-2.6v-6.8c0-1.4.9-2.6 2-2.6v12"/>
            <path d="M53 43c1.1 0 2 1.2 2 2.6v6.8c0 1.4-.9 2.6-2 2.6V43"/>
        </g>
        <g fill="#3e4347">
            <path d="M7 20H5v30h4v-2H7z"/>
            <path d="M57 20v28h-2v2h4V20z"/>
        </g><circle cx="58" cy="20" r="4" fill="#00b9f1"/>
        <circle cx="6" cy="20" r="4" fill="#ff5263"/>
        <path d="M21.5 39.5c-4.4 0-8-3.6-8-8s3.6-8 8-8s8 3.6 8 8s-3.6 8-8 8" fill="#efffd9"/>
        <circle cx="21.5" cy="31.5" r="6" fill="#545b61"/>
        <circle cx="21.5" cy="31.5" r="2.3" fill="#ff5263"/>
        <path d="M42.5 39.5c-4.4 0-8-3.6-8-8s3.6-8 8-8s8 3.6 8 8s-3.6 8-8 8" fill="#efffd9"/>
        <path d="M42.5 37.5c-3.3 0-6-2.7-6-6s2.7-6 6-6s6 2.7 6 6s-2.7 6-6 6" fill="#545b61"/>
        <circle cx="42.5" cy="31.5" r="2.3" fill="#ff5263"/>
        <path d="M19.8 54.1c-7.4 0-7.4-13 0-13h24.5c7.4 0 7.4 13 0 13H19.8" fill="#efffd9"/>
        <path d="M20.5 52.6c-6 0-6-10 0-10h23c6 0 6 10 0 10h-23" fill="#89967a"/>
        <g opacity=".7" fill="#3e4347">
            <path d="M21.2 50.7c0 1.2-2 1.2-2 0v-6.1c0-1.2 2-1.2 2 0v6.1"/>
            <path d="M25.9 50.7c0 1.2-2 1.2-2 0v-6.1c0-1.2 2-1.2 2 0v6.1"/>
            <path d="M30.6 50.7c0 1.2-2 1.2-2 0v-6.1c0-1.2 2-1.2 2 0v6.1"/>
            <path d="M35.4 50.7c0 1.2-2 1.2-2 0v-6.1c0-1.2 2-1.2 2 0v6.1"/>
            <path d="M40.1 50.7c0 1.2-2 1.2-2 0v-6.1c0-1.2 2-1.2 2 0v6.1"/>
            <path d="M44.8 50.7c0 1.2-2 1.2-2 0v-6.1c0-1.2 2-1.2 2 0v6.1"/>
        </g><circle cx="32" cy="37" r="2" fill="#f5f5f5"/>
        <path fill="#545b61" d="M30.316 35.862l.566-.565l2.828 2.828l-.565.566z"/>
        <rect x="0" y="0" width="64" height="64" fill="rgba(0, 0, 0, 0)" />
    </svg>)
}

class Main extends React.Component {
    urls = [
        'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/237/raised-fist_270a.png',
        'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/237/victory-hand_270c.png',
        'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/237/raised-hand_270b.png'
    ];
    constructor(props) {
        super(props);

        this.state = {
            activePanel: 'menu',
            leftHand: 0,
            rightHand: 0,
            userScore: 0,
            botScore: 0,
            activeModal: null,
            round: false
        }
        this.jopa = this.jopa.bind(this);
    }

    componentDidMount() {
        bridge.send("VKWebAppInit", {}).then(
            r => {
                bridge.send("VKWebAppGetUserInfo", {}).then(
                    r => this.setState({
                        userAva: r.photo_200,
                        userName: r.first_name
                    })
                )
            }
    );
    }

    jopa(e){
        if (this.state.round){
            return;
        }
        $('.left_hand,.right_hand').removeClass('animated');
        setTimeout(() => {
            $('.left_hand,.right_hand').addClass('animated');
        }, 5);
        this.setState({
            leftHand: 0,
            rightHand: 0,
            round: true
        });
        setTimeout(() => {
            let botScore = this.state.botScore;
            let userScore = this.state.userScore;
            let botChoice = randInt(0,2);
            let userChoice = e;

            switch (userChoice) {
                case 0:
                    switch (botChoice) {
                        case 1:
                            userScore++;
                            break;
                        case 2:
                            botScore++;
                            break;
                        default:
                            break;
                    }
                    break;
                case 1:
                    switch (botChoice) {
                        case 2:
                            userScore++;
                            break;
                        case 0:
                            botScore++;
                            break;
                        default:
                            break;
                    }
                    break;
                case 2:
                    switch (botChoice) {
                        case 0:
                            userScore++;
                            break;
                        case 1:
                            botScore++;
                            break;
                        default:
                            break;
                    }
                    break;
            }
            let round;
            if (userScore >= 2 || botScore >= 2){
                round = true;
            }
            else{
                round = false;
            }
            this.setState({
                leftHand: botChoice,
                rightHand: userChoice,
                userScore: userScore,
                botScore: botScore,
                round: round
            });
            $('.test').addClass('hidden');
            setTimeout(() => {
                $('.test2').removeClass('hidden');
            }, 200);
            setTimeout(() => {
                $('.test2').addClass('hidden');
                $('.test').removeClass('hidden');
                if (this.state.userScore >= 2 || this.state.botScore >= 2){
                    let won;
                    if (this.state.userScore >= 2){
                        won = 'userWon';
                    }
                    else{
                        won = 'botWon';
                    }
                    this.setState({
                        userScore: 0,
                        botScore: 0,
                        activeModal: won
                    });
                }
                //this.jopa();
                this.setState({
                    leftHand: 0,
                    rightHand: 0
                });
            }, 2000);
        }, 0.6*2.85*1000)
    }

    setActiveModal = (e) => {
        this.setState({
            activeModal: e,
            round: false
        })
    }

    render() {
        const winLose = (
            <ModalRoot activeModal={this.state.activeModal}
                       onClose={() => this.setActiveModal(null)}>
                <ModalCard
                    id="userWon"
                    onClose={() => this.setActiveModal(null)}
                    icon={<IconClown size={128}/>}
                    header="Победа"
                    caption="Можем повторить"
                    // actions={[{
                    //     title: 'Попробовать',
                    //     mode: 'primary',
                    //     action: () => {
                    //         this.setActiveModal(null);
                    //     }
                    // }]}
                >
                </ModalCard>
                <ModalCard
                    id="botWon"
                    onClose={() => this.setActiveModal(null)}
                    icon={(
                        <IconSad size={128}/>
                    )}
                    header="Проиграл"
                    caption="лох"
                    // actions={[{
                    //     title: 'Попробовать',
                    //     mode: 'primary',
                    //     action: () => {
                    //         this.setActiveModal(null);
                    //     }
                    // }]}
                >
                </ModalCard>
            </ModalRoot>
        );
        return (
            <View activePanel={this.state.activePanel} id="menu" modal={winLose}>
                <Panel id="menu">
                    <PanelHeader>КНБ</PanelHeader>
                    <Group>
                        <Cell expandable before={<Icon28BrainOutline/>} onClick={() => this.setState({activePanel: 'with_bot'})}>Против бота</Cell>
                    </Group>
                </Panel>
                <Panel id="with_bot">
                    <PanelHeader left={<PanelHeaderBack onClick={() => this.setState({ activePanel: 'menu' })}/>}>Против бота</PanelHeader>
                    <Group>
                        <CardGrid className="battle_avas" style={{borderRadius: 5, padding: 10}}>
                            <Card size="l">
                                <Card style={{paddingTop: 15}} className="text-middle" size="s">
                                    <div className="test">
                                        <IconRobot size={48}/>
                                        <Header className="no-flex" mode="secondary">полный лох</Header>
                                    </div>
                                    <div className="test2 hidden">{this.state.botScore}</div>
                                </Card>
                                <Card style={{marginTop: 42}} className="text-middle" size="s">
                                    <Header className="no-flex" mode="secondary">против</Header>
                                </Card>
                                <Card style={{paddingTop: 15}} className="text-middle" size="s">
                                    <div className="test">
                                        <Avatar src={this.state.userAva ? this.state.userAva : 'https://vk.com/images/camera_200.png'}/>
                                        <Header className="no-flex" mode="secondary">{this.state.userName ? this.state.userName : 'тоже лох'}</Header>
                                    </div>
                                    <div className="test2 hidden">{this.state.userScore}</div>
                                </Card>
                            </Card>
                            <div className="clear-fix"/>
                        </CardGrid>
                    </Group>
                    <Group style={{padding: 30}}>
                        <img className="left left_hand" alt="hui jopa pidaraz" src={this.urls[this.state.leftHand]}/>
                        <img className="right right_hand" alt="hui jopa pidaraz" src={this.urls[this.state.rightHand]}/>
                        <div className="clear-fix"/>
                    </Group>
                    <FixedLayout style={
                        this.state.round ? {
                            transition: '.2s',
                            transform: 'translateY(100%)'
                        } : {
                            transition: '.2s'
                        }
                    } vertical="bottom">
                        <CardGrid className="battle_avas" style={{borderRadius: 5, padding: 10}}>
                            <Card size="l">
                                <Card className="text-middle" size="s">
                                    <img onClick={() => {this.jopa(0)}} className="selectHand" alt="jopa" src={this.urls[0]}/>
                                </Card>
                                <Card className="text-middle" size="s">
                                    <img onClick={() => {this.jopa(1)}} className="selectHand" alt="jopa" src={this.urls[1]}/>
                                </Card>
                                <Card className="text-middle" size="s">
                                    <img onClick={() => {this.jopa(2)}} className="selectHand" alt="jopa" src={this.urls[2]}/>
                                </Card>
                            </Card>
                            <div className="clear-fix"/>
                        </CardGrid>
                    </FixedLayout>
                </Panel>
            </View>
        )
    }
}

ReactDOM.render(
  <React.StrictMode>
      <Main/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
