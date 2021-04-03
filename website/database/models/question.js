const Question = (sequelize, DataTypes) => {
  const alias = "Question";
  const cols = {
		questionID: {
			type: DataTypes.UUID,
			allowNull: false,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4,
		},
		postID: {
			type: DataTypes.UUID,
			allowNull: false,
		},
		userID: {
			type: DataTypes.UUID,
			allowNull: false,
		},
		question: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		question_date: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		answer: {
		type: DataTypes.STRING,
		allowNull: true
		},
		answer_date: {
			type: DataTypes.DATE,
			allowNull: true,
		},
	};
  const config = {
		tableName: "questions",
		timeStamps: true,
	};
	let question = sequelize.define(alias, cols, config);
	question.associate = models => {
		question.belongsTo(models.Post, {foreignKey: "postID", as: "post"});
		question.belongsTo(models.User, {foreignKey: "userID", as: "user"});
	}
	return question;
}

module.exports = Question;