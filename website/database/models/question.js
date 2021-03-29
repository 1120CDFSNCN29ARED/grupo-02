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
      allowNull: false
    },
		answer_date: {
			type: DataTypes.DATE,
			allowNull: false,
		},
	};
  const config = {
		tableName: "questions",
		timeStamps: true,
	};

	return sequelize.define(alias, cols, config);
}

module.exports = Question;