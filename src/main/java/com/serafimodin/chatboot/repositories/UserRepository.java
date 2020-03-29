package com.serafimodin.chatboot.repositories;

import com.serafimodin.chatboot.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

    User findByUsername(String username);

}
