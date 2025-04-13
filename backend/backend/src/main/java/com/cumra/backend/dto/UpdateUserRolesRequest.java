package com.cumra.backend.dto;

import java.util.List;

// DTO for updating a user's roles from the Admin Panel.
// Expects a list of role IDs to be assigned to the user.
public class UpdateUserRolesRequest {
    private List<Long> roleIds;

    public List<Long> getRoleIds() {
        return roleIds;
    }

    public void setRoleIds(List<Long> roleIds) {
        this.roleIds = roleIds;
    }
}
