package api

import (
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
	helpers "github.com/matthewdeguzman/GatorGuessr/src/server/endpoints"
	u "github.com/matthewdeguzman/GatorGuessr/src/server/structs"
	"gorm.io/gorm"
)

func GetTopUsers(w http.ResponseWriter, r *http.Request, db *gorm.DB) {
	var users []u.User
	params := mux.Vars(r)

	limit, err := strconv.Atoi(params["limit"])
	if err != nil {
		helpers.WriteErr(w, http.StatusBadRequest, "400 - Could not process limit")
		return
	}
	if limit <= 0 {
		helpers.WriteErr(w, http.StatusBadRequest, "400 - Limit must be a positive integer")
		return
	}

	db.Limit(limit).Order("score desc").Find(&users)
	helpers.EncodeUsers(users, w)
}
