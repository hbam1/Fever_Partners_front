import React from 'react';
import styles from "./css/AchievementReport.module.css";

const AchievementReportList = () => {
    // 더미 데이터
    const reports = [
        {
            id: 1,
            goal: {
                title: '헬스장 가기',
                user: {
                    nickname: '운동매니아'
                }
            },
            content: '오늘은 헬스장에서 유산소 운동을 하였습니다. 목표 달성이 힘들었지만 재미있었습니다.',
            reacted_respectful: {
                all: {
                    count: 20
                }
            }
        }, {
            id: 2,
            goal: {
                title: '독서하기',
                user: {
                    nickname: '책벌레'
                }
            },
            content: '오늘은 책 한 권을 읽었습니다. 내용이 흥미로워서 한 번에 다 읽을 수 있었습니다.',
            reacted_respectful: {
                all: {
                    count: 18
                }
            }
        }, {
            id: 3,
            goal: {
                title: '프로그래밍 공부',
                user: {
                    nickname: '코딩왕초보'
                }
            },
            content: '오늘은 자바스크립트를 공부하였습니다. 조금 어려웠지만 열심히 공부해서 기본 개념을 익혔습니다.',
            reacted_respectful: {
                all: {
                    count: 15
                }
            }
        }, {
            id: 4,
            goal: {
                title: '일기 쓰기',
                user: {
                    nickname: '일기꾼'
                }
            },
            content: '오늘 하루 일기를 썼습니다. 생각을 정리하는데 도움이 되었습니다.',
            reacted_respectful: {
                all: {
                    count: 12
                }
            }
        }, {
            id: 5,
            goal: {
                title: '운동하기',
                user: {
                    nickname: '운동왕'
                }
            },
            content: '오늘은 체력 단련을 위해 운동을 하였습니다. 목표를 달성해서 기분이 좋습니다.',
            reacted_respectful: {
                all: {
                    count: 25
                }
            }
        }, {
            id: 6,
            goal: {
                title: '요리 연습',
                user: {
                    nickname: '요리왕'
                }
            },
            content: '오늘은 새로운 요리를 연습하였습니다. 맛있게 나와서 기쁩니다.',
            reacted_respectful: {
                all: {
                    count: 17
                }
            }
        }, {
            id: 7,
            goal: {
                title: '영어 공부',
                user: {
                    nickname: '영어 공부 중'
                }
            },
            content: '오늘은 영어 문법을 공부하였습니다. 조금 어려웠지만 열심히 공부해서 이해했습니다.',
            reacted_respectful: {
                all: {
                    count: 14
                }
            }
        }, {
            id: 8,
            goal: {
                title: '산책하기',
                user: {
                    nickname: '산책러'
                }
            },
            content: '오늘은 공원에서 산책을 하였습니다. 시원한 바람과 푸른 나무가 기분 좋았습니다.',
            reacted_respectful: {
                all: {
                    count: 20
                }
            }
        }, {
            id: 9,
            goal: {
                title: '영화 감상',
                user: {
                    nickname: '영화광'
                }
            },
            content: '오늘은 좋은 영화를 보았습니다. 감동적인 이야기와 멋진 연기로 기분이 좋았습니다.',
            reacted_respectful: {
                all: {
                    count: 22
                }
            }
        }, {
            id: 10,
            goal: {
                title: '음악 듣기',
                user: {
                    nickname: '음악애호가'
                }
            },
            content: '오늘은 좋아하는 음악을 듣는 시간을 가졌습니다. 편안한 마음으로 즐길 수 있었습니다.',
            reacted_respectful: {
                all: {
                    count: 19
                }
            }
        }, {
            id: 11,
            goal: {
                title: '코딩 공부',
                user: {
                    nickname: '코딩마스터'
                }
            },
            content: '오늘은 새로운 프로그래밍 언어를 공부하였습니다. 어려움이 있었지만 해결하고 성취감을 느꼈습니다.',
            reacted_respectful: {
                all: {
                    count: 16
                }
            }
        }, {
            id: 12,
            goal: {
                title: '요가 수련',
                user: {
                    nickname: '요가 강사'
                }
            },
            content: '오늘은 요가를 수련하였습니다. 몸과 마음이 편안해지는 느낌입니다.',
            reacted_respectful: {
                all: {
                    count: 21
                }
            }
        }, {
            id: 13,
            goal: {
                title: '그림 그리기',
                user: {
                    nickname: '화가'
                }
            },
            content: '오늘은 풍경을 그렸습니다. 새로운 시도라 재미있었습니다.',
            reacted_respectful: {
                all: {
                    count: 18
                }
            }
        }, {
            id: 14,
            goal: {
                title: '음식 만들기',
                user: {
                    nickname: '요리왕'
                }
            },
            content: '오늘은 새로운 음식을 만들어보았습니다. 맛있게 나와서 기분이 좋습니다.',
            reacted_respectful: {
                all: {
                    count: 23
                }
            }
        }, {
            id: 15,
            goal: {
                title: '일기 쓰기',
                user: {
                    nickname: '일기꾼'
                }
            },
            content: '오늘 하루 일기를 썼습니다. 생각을 정리하는데 도움이 되었습니다.',
            reacted_respectful: {
                all: {
                    count: 19
                }
            }
        }
    ];

    return (
        <div className={styles.reportWrap}>
            <div className={styles.header}>
                <a className={styles.goBackLink} href="">
                    <i className="ri-arrow-left-s-line"></i>
                </a>
                <p className={styles.roomTitle}>달성보고</p>
                <a className={styles.hideArrowIcon} href="">
                    <i className="ri-arrow-left-s-line"></i>
                </a>
            </div>
            <div className={styles.reportContainer}>
                {
                    reports.map(report => (
                        <div className={styles.reportCard} key={report.id}>
                            <a href="#">{report.goal.title}</a>
                            <p>
                                <span className={styles.reportSpan}>달성자</span>
                                {report.goal.user.nickname}
                            </p>
                            <p className={`${styles.reportContent} ${styles.reportEllipsis}`}>
                                <span className={styles.reportSpan}>달성 후기</span>
                                {report.content}
                            </p>
                            <div className={styles.likeContainer}>
                                <i className="ri-thumb-up-line"></i>
                                <span id="report-like-count">{report.reacted_respectful.all.count}</span>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default AchievementReportList;
