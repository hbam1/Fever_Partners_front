import { Link } from "react-router-dom";

const MyGroups = () => {
    return (
        <div>
            <header>
                <span class="go_back" href="">
                    <i class="ri-arrow-left-s-line"></i>
                </span>
                <p class="room-title">그룹</p>
                <i class="ri-arrow-left-s-line hide-arrow"></i>
            </header>
    <div class="group-wrap">
    {% for room in rooms %}
    <div class="group-div">
        {% if room.is_active %}
            <div class="no-ac">
                <div class="group-icon">
                    <div class="icon">
                        <i class="ri-group-line"></i>
                        <a href="{% url 'group_activity:main_page' room.pk %}"><h3>{{ room.title }}</h3></a>
                    </div>
                    <div>
                        <a class="ac-btn" href="{% url 'group_activity:main_page' room.pk %}">그룹</a>
                        {% if room.closing_date < current_time %}
                            <a class="ac-btn" onclick="GroupClosureConfirm({{room.pk}})">활동종료</a>
                        {% endif %}
                    </div>
                </div>
            </div>
            <div class="room-detail">
                <p><span>방장</span> {{ room.master.nickname }} &nbsp;&nbsp; <span>인원수 </span>{{room.members.all.count}}</p>
                <p><span>태그</span>
                    {% for tag in room.tags.all %}
                        {{ tag.tag_name }}
                    {% endfor %}
                </p>
                <p><span>활동태그</span>
                    {% for activity_tag in room.activityTags.all %}
                        {{ activity_tag.tag_name }}
                    {% endfor %}
                </p>
                <p><span>활동 종료일 </span>{{room.closing_date}}</p>
            </div>
        {% else %}
            {% if user.pk == room.master.pk %}
                <div class="no-ac">
                    <div class="group-icon">
                        <div class="icon">
                            <i class="ri-group-line"></i>
                            <a href="{% url 'group_management:recommendation_page' room.pk %}"><h3>{{ room.title }}</h3></a>
                        </div>
                        <div>
                            <a class="ac-btn" href="{% url 'group_administration:activate_room' room.pk %}">활동개시</a>
                            <a class="ac-btn" href="{% url 'group_management:recommendation_page' room.pk %}">유저추천</a>
                        </div>
                    </div>
                </div>
                <div class="room-detail">
                    <p><span>방장</span> {{ room.master.nickname }} &nbsp;&nbsp; <span>인원수 </span>{{room.members.all.count}}</p>
                    <p><span>태그</span>
                        {% for tag in room.tags.all %}
                            {{ tag.tag_name }}
                        {% endfor %}
                    </p>
                    <p><span>활동태그</span>
                        {% for activity_tag in room.activityTags.all %}
                            {{ activity_tag.tag_name }}
                        {% endfor %}
                    </p>
                </div>
            {% else %}
                <div class="no-ac">
                    <div class="group-icon">
                        <div class="icon">
                            <i class="ri-group-line"></i>
                            <a onclick="NotActiveYetModal()"><h3>{{ room.title }}</h3></a>
                        </div>
                    </div>
                </div>
                <div class="room-detail">
                    <p><span>방장</span> {{ room.master.nickname }} &nbsp&nbsp <span>인원수 </span>{{room.members.all.count}}</p>
                    <p><span>태그</span>
                        {% for tag in room.tags.all %}
                            {{ tag.tag_name }}
                        {% endfor %}
                    </p>
                    <p><span>활동태그</span>
                        {% for activity_tag in room.activityTags.all %}
                            {{ activity_tag.tag_name }}
                        {% endfor %}
                    </p>
                </div>
            {% endif %}
        {% endif %}
    </div>
    
        {% endfor %}
    </div> 
    <div class="footer">
        <a href="{% url 'group_management:group_list' %}" class="footer-link" style="display: flex;">
          <div class="footer-item">
            <i class="fa-solid fa-user-group footer-icon"></i>
            <a href="{% url 'group_management:group_list' %}" class="footer-text">내 그룹</a>
          </div>
        </a>
        <a href="{% url 'goal_management:goal_list' %}" class="footer-link" style="display: flex;">
          <div class="footer-item">
            <i class="fa-solid fa-bullseye footer-icon"></i>
            <a href="{% url 'goal_management:goal_list' %}" class="footer-text">내 목표</a>
          </div>
        </a>
        <a href="{% url 'goal_management:achievement_report_list'%}" class="footer-link" style="display: flex;">
          <div class="footer-item">
            <i class="ri-file-list-3-line footer-icon"></i>
            <a href="{% url 'goal_management:achievement_report_list'%}" class="footer-text">달성보고</a>    <!-- 이 부분 이름은 나중에 수정 필요 -->
          </div>
        </a>
      </div>
        </div>
    );
}